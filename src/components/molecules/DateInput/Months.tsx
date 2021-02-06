import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Text from 'components/atoms/Text';
import View from 'components/atoms/View';
import theme from 'config/theme';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Month = {
  label: string;
  value: number;
};

type Props = {
  date: string;
  months: Month[];
  onPress: (month: string) => void;
};

const MonthInput: React.FC<Props> = (props) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.months}>
        {props.months.map((month) => (
          <TouchableOpacity
            key={month.value}
            onPress={() => props.onPress(('00' + month.value).slice(-2))}
          >
            <View style={styles.monthItem}>
              <Text
                color={
                  String(month.value) === dayjs(props.date).format('M')
                    ? 'primary'
                    : 'secondary'
                }
              >
                {month.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default memo(MonthInput);

const styles = StyleSheet.create({
  months: {
    flexDirection: 'row',
    paddingTop: theme().space(2),
  },
  monthItem: {
    paddingRight: theme().space(3),
  },
});
