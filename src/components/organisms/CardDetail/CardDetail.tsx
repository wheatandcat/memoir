import React, { memo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Category from 'components/atoms/Category';
import IconButton from 'components/molecules/IconButton';
import theme from 'config/theme';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  title: string;
};

const CardDetail: React.FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const titleStyle = {
    width: windowWidth - 60,
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View>
          <Text>{dayjs().format('YYYY.MM.DD / ddd')}</Text>
        </View>
        <View>
          <IconButton name="more-horiz" size="base" onPress={() => null} />
        </View>
      </View>
      <View style={styles.icon}>
        <Category categoryID={2} />
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
    borderColor: theme().category.color.category1,
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
});
