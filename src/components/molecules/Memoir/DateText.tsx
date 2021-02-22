import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  date: string;
};

const DateText: React.FC<Props> = (props) => {
  return (
    <View style={styles.date}>
      <View style={styles.divider} />
      <View style={styles.dateText}>
        <Text textAlign="center" variants="middle">
          {dayjs(props.date).format('YYYY.MM.DD / ddd')}
        </Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export default memo(DateText);

const styles = StyleSheet.create({
  date: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dateText: {
    width: '50%',
  },
  divider: {
    backgroundColor: theme().color.base.dark,
    height: StyleSheet.hairlineWidth,
    width: '20%',
  },
});
