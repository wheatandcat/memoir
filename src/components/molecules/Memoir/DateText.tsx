import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import Category from 'components/atoms/Category';
import theme from 'config/theme';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  date: string;
  categoryID: number;
};

const DateText: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View my={3}>
        <Category categoryID={props.categoryID} />
      </View>
      <View style={styles.date}>
        <Text textAlign="center" variants="logo">
          {dayjs(props.date).format('YYYY.MM.DD / ddd')}
        </Text>
      </View>
    </View>
  );
};

export default memo(DateText);

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: theme().space(2),
  },
  date: {
    height: 70,
  },
});
