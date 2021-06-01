import React, { memo, useCallback } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
  Alert,
} from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Image from 'components/atoms/Image';
import Category from 'components/atoms/Category';
import theme from 'config/theme';
import dayjs from 'lib/dayjs';
import setting from 'components/atoms/Category/setting';
import { categoryBorderStyle } from 'lib/category';
import Menu, { Item as MenuItem } from 'components/organisms/Menu/Menu';

type Props = {
  title: string;
  date: string;
  categoryID: number;
  like: boolean;
  dislike: boolean;
  onOpenUpdateItem: () => void;
  onDeleteItem: () => void;
};

const CardDetail: React.FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const titleStyle = {
    width: windowWidth - 60,
  };

  const category = setting().icon.find((v) => v.id === props.categoryID)
    ?.category;
  const categoryStyle: ViewStyle[] = [
    styles.root,
    categoryBorderStyle(category || 0),
  ];

  const menuItem = useCallback(
    (): MenuItem[] => [
      {
        text: '削除',
        color: 'error',
        onPress: (callback?: () => void) => {
          Alert.alert(
            '削除しますか？',
            '',
            [
              {
                text: 'キャンセル',
                style: 'cancel',
              },
              {
                text: '削除する',
                onPress: () => {
                  props.onDeleteItem();
                  callback?.();
                },
              },
            ],
            {
              cancelable: true,
            }
          );
        },
        removeMenu: false,
      },
      {
        text: '編集',
        color: 'secondary',
        onPress: () => {
          props.onOpenUpdateItem();
        },
        removeMenu: true,
      },
    ],
    [props]
  );

  return (
    <View style={categoryStyle}>
      <View style={styles.header}>
        <View>
          <Text>{dayjs(props.date).format('YYYY.MM.DD / ddd')}</Text>
        </View>
        <Menu items={menuItem()} />
      </View>
      <View style={styles.icon}>
        <Category categoryID={props.categoryID} />
        {props.like && (
          <View px={3}>
            <Image
              source={require('../../../img/icon/icon_like.png')}
              width={60}
              height={60}
              resizeMode="contain"
            />
          </View>
        )}
        {props.dislike && (
          <View px={3}>
            <Image
              source={require('../../../img/icon/icon_dislike.png')}
              width={60}
              height={60}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
      <View style={[styles.title, titleStyle]}>
        <Text lineHeight={25}>{props.title}</Text>
      </View>
      <View style={styles.footer} />
    </View>
  );
};

export default memo(CardDetail);

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
    borderLeftWidth: 5,
    paddingHorizontal: theme().space(3),
    paddingVertical: theme().space(2),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    paddingBottom: theme().space(4),
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme().space(4),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
