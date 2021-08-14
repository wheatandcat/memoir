import React, { memo, useRef, useCallback, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
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
          onPress={() => null}
          onLoadEnd={props.onLoadEnd}
        />
        {!props?.last && <Divider />}
      </View>
    </View>
  );
};

const ScreenShot: React.FC<Props> = (props) => {
  const viewShot = useRef<ViewShot>(null);
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

  const onCapture = useCallback(async () => {
    const url = await viewShot.current?.capture?.();

    if (url) onShare('file://' + url);
  }, [onShare]);

  const onLoadEnd = useCallback(() => {
    count.current = count.current + 1;

    if (props.items.length === count.current) {
      setLoading(false);
      setTimeout(() => onCapture(), 100);
    }
  }, [props.items, onCapture]);

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
          onLoadEnd: onLoadEnd,
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

  return (
    <>
      <ScrollView style={styles.root}>
        <ViewShot ref={viewShot} options={{ format: 'jpg' }}>
          <Header startDate={props.startDate} endDate={props.endDate} />
          {data.map((v, index) => (
            <RenderItem {...v} key={index} />
          ))}
          <View />
        </ViewShot>
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
});

export default memo(ScreenShot);
