import React, { memo } from 'react';
import { StyleSheet, useWindowDimensions, ViewStyle } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Category from 'components/atoms/Category';
import IconButton from 'components/molecules/IconButton';
import theme from 'config/theme';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import master from 'lib/master';
import setting from 'components/atoms/Category/setting';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  title: string;
  categoryID: number;
};

const CardDetail: React.FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const titleStyle = {
    width: windowWidth - 60,
  };

  const category = setting().icon.find((v) => v.id === props.categoryID)
    ?.category;
  const categoryStyle: ViewStyle[] = [styles.root];
  switch (category) {
    case master.CATEGORY_1:
      categoryStyle.push(styles.category1);
      break;
    case master.CATEGORY_2:
      categoryStyle.push(styles.category2);
      break;
    case master.CATEGORY_3:
      categoryStyle.push(styles.category3);
      break;
  }

  return (
    <View style={categoryStyle}>
      <View style={styles.header}>
        <View>
          <Text>{dayjs().format('YYYY.MM.DD / ddd')}</Text>
        </View>
        <View>
          <IconButton name="more-horiz" size="base" onPress={() => null} />
        </View>
      </View>
      <View style={styles.icon}>
        <Category categoryID={props.categoryID} />
      </View>
      <View style={[styles.title, titleStyle]}>
        <Text lineHeight={25}>{props.title}</Text>
      </View>
      <View style={styles.footer}>
        <View>
          <Text>taro</Text>
        </View>
      </View>
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
  category1: {
    borderLeftColor: theme().category.color.category1,
  },
  category2: {
    borderLeftColor: theme().category.color.category4,
  },
  category3: {
    borderLeftColor: theme().category.color.category2,
  },
});
