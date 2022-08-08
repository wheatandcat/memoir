import React, { memo, useRef, useCallback, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Alert,
  View as RNView,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import View from 'components/atoms/View';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'lib/dayjs';
import theme from 'config/theme';
import { Props as PlainProps } from 'components/pages/Memoir/ScreenShot/Plain';
import { User as TUser } from 'store/atoms';
import Header from 'components/molecules/Memoir/Header';
import { getModeCountMax } from 'lib/utility';
import DateText from 'components/molecules/Memoir/DateText';
import Divider from 'components/atoms/Divider';
import Loading from 'components/molecules/Overlay/Loading';
import { Item } from 'hooks/useItemsInPeriodPaging';
import { useConfig } from 'containers/Config';
import { uploadImageAsync, deleteImageAsync, resizeImage } from 'lib/image';
import { v4 as uuidv4 } from 'uuid';
import Image from 'components/atoms/Image';
import Constants from 'expo-constants';
import Card from './Card';

export type Props = Pick<PlainProps, 'users'> & {
  startDate: string;
  endDate: string;
  items: Item[];
};

type User = Omit<TUser, 'userID'> & {
  id: string;
};

type Card = Item & {
  user: User;
};

type RenderedItem = {
  date: string | null;
  contents?: Card;
  categoryID?: number;
  last?: boolean;
  width: number;
  onLoadEnd: () => void;
};

const RenderItem: React.FC<RenderedItem> = (props) => {
  if (props.date) {
    return <DateText date={props.date} categoryID={Number(props.categoryID)} />;
  }

  return (
    <View>
      <View mb={3} mx={3}>
        <Card
          title={props?.contents?.title || ''}
          categoryID={props?.contents?.categoryID || 0}
          user={props?.contents?.user as User}
          onLoadEnd={props.onLoadEnd}
        />
        {!props?.last && <Divider />}
      </View>
      {!!props.last && (
        <Image
          source={require('../../../img/icon/border_dotted.png')}
          width={props.width}
          height={2}
        />
      )}
    </View>
  );
};

const ScreenShot: React.FC<Props> = (props) => {
  const { env } = useConfig();

  const viewShot1 = useRef<ViewShot>(null);
  const viewShot2 = useRef<ViewShot>(null);
  const viewShot3 = useRef<ViewShot>(null);
  const viewShot4 = useRef<ViewShot>(null);
  const viewShot5 = useRef<ViewShot>(null);

  const navigation = useNavigation();
  const count = useRef(0);
  const [loading, setLoading] = useState(true);

  const windowWidth = useWindowDimensions().width;

  const onShare = useCallback(
    async (uri: string) => {
      const ok = await Sharing.isAvailableAsync();
      if (!ok) {
        Alert.alert('エラー', '共有機能を利用できませんでした', [
          {
            text: '戻る',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);

        return;
      }

      await Sharing.shareAsync(uri);

      navigation.goBack();
    },
    [navigation]
  );

  const dates = Array.from(
    new Set(props.items.map((v) => dayjs(v.date).format('YYYY-MM-DD')))
  );

  const dateItems = dates.sort().map((date) => {
    const contents = date;

    return {
      date,
      contents,
    };
  });

  const getData = useCallback(
    (loadEnd?: () => void) => {
      const data = dateItems
        .map((v1) => {
          const sameDateItems = props.items.filter(
            (v2) => dayjs(v2.date).format('YYYY-MM-DD') === v1.date
          );

          const item: RenderedItem[] = sameDateItems.map((v2, index) => {
            const user: User | undefined = props.users.find(
              (v) => v.id === v2.userID
            );

            return {
              date: null,
              contents: {
                ...v2,
                user: user || {
                  id: '',
                  displayName: '',
                  image: '',
                },
              },
              last: sameDateItems.length === index + 1,
              width: windowWidth,
              onLoadEnd: loadEnd ? loadEnd : () => null,
            };
          });

          const categoryID = item.map((v) => Number(v.contents?.categoryID));

          const dateItem: RenderedItem = {
            date: v1.date,
            categoryID: getModeCountMax(categoryID),
            width: windowWidth,
            onLoadEnd: () => null,
          };

          return [dateItem, ...item];
        })
        .flat();

      return data;
    },
    [props, windowWidth, dateItems]
  );

  const sliceItemCount = Math.floor(getData().length / 20) + 1;

  const onCapture = useCallback(async () => {
    if (env === 'storybook') {
      //storybookの場合はスルーさせる
      return;
    }
    const urlList: string[] = [];
    const deleteImageURL: string[] = [];

    for (let i = 0; i < sliceItemCount; i++) {
      const ref = getViewShotRef(i);
      const url = await ref.current?.capture?.();
      const uri = await resizeImage(url || '');
      const uploadURL = await uploadImageAsync(uri, `public/${uuidv4()}`);
      const u = uploadURL
        .replace(Constants.manifest?.extra?.STORAGE_URL || '', '')
        .split('?')[0];
      urlList.push(u);
      deleteImageURL.push(uploadURL);
    }

    const param = urlList.join(',');
    const fileName = `${dayjs(props.startDate).format('YYYYMMDD')}_${dayjs(
      props.endDate
    ).format('YYYYMMDD')}_memoir`;

    const res = await FileSystem.downloadAsync(
      `${Constants.manifest?.extra?.IMAGE_MERGE_API}?images=${param}`,
      `${FileSystem.documentDirectory}${fileName}.png`
    );

    for (let i = 0; i < deleteImageURL.length; i++) {
      await deleteImageAsync(deleteImageURL[i]);
    }

    if (res.uri) onShare(res.uri);
  }, [onShare, env, sliceItemCount, props.startDate, props.endDate]);

  const onLoadEnd = useCallback(() => {
    count.current = count.current + 1;

    if (props.items.length === 0) {
      return;
    }

    if (props.items.length === count.current) {
      setLoading(false);
      setTimeout(() => onCapture(), 100);
    }
  }, [props.items, onCapture]);

  const items: RenderedItem[][] = [];

  for (let i = 0; i < sliceItemCount; i++) {
    const target = i * 20;
    items.push(getData(onLoadEnd).slice(target, target + 20));
  }

  const getViewShotRef = (key: number) => {
    switch (key) {
      case 0:
        return viewShot1;
      case 1:
        return viewShot2;
      case 2:
        return viewShot3;
      case 3:
        return viewShot4;
      case 4:
        return viewShot5;
      default:
        return viewShot1;
    }
  };

  return (
    <>
      <ScrollView style={styles.root}>
        {items.map((item, key) => {
          const ref = getViewShotRef(key);

          return (
            <ViewShot ref={ref} options={{ format: 'jpg' }} key={key}>
              <RNView style={styles.inner}>
                {key === 0 && (
                  <Header
                    startDate={props.startDate}
                    endDate={props.endDate}
                    isTitle
                  />
                )}
                {item.map((v, index) => {
                  return <RenderItem {...v} key={`${key}_${index}`} />;
                })}
              </RNView>
            </ViewShot>
          );
        })}
      </ScrollView>
      {loading && <Loading text="作成中" />}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    flex: 1,
    width: '100%',
    paddingTop: theme().space(4),
  },
  inner: {
    backgroundColor: theme().color.background.main,
  },
});

export default memo(ScreenShot);
