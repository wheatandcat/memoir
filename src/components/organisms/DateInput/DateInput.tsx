import React, { memo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from 'components/atoms/Text';
import Divider from 'components/atoms/Divider';
import View from 'components/atoms/View';
import theme from 'config/theme';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

const years = [2020, 2021];
const months = ['1/Jun', '2/Feb', '3/Mar', '4/Apr', '5/May', '6/June'];
const days = [
  '2020-01-01',
  '2020-01-02',
  '2020-01-03',
  '2020-01-04',
  '2020-01-05',
  '2020-01-06',
  '2020-01-07',
  '2020-01-08',
];

type State = {
  date: string;
};

const initialState = (): State => ({
  date: dayjs().format('YYYY-MM-DD'),
});

const DateInput = () => {
  const [state, setState] = useState<State>(initialState());

  const onYear = (year: number) => {
    const date = dayjs(state.date).format(`${year}-MM-DD`);

    setState((s) => ({ ...s, date }));
  };

  return (
    <>
      <View>
        <View style={styles.years}>
          {years.map((year) => (
            <TouchableOpacity key={year} onPress={() => onYear(year)}>
              <View style={styles.yearItem}>
                <Text
                  color={
                    String(year) === dayjs(state.date).format('YYYY')
                      ? 'primary'
                      : 'secondary'
                  }
                >
                  {year}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Divider my={2} />
        <View style={styles.months}>
          {months.map((month) => (
            <TouchableOpacity key={month}>
              <View style={styles.monthItem}>
                <Text>{month}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Divider my={2} />
        <View style={styles.days}>
          {days.map((day) => (
            <TouchableOpacity key={day}>
              <View style={styles.dayItem}>
                <Text textAlign="center">{dayjs(day).format('D')}</Text>
                <Text textAlign="center">{dayjs(day).format('dd')}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default memo(DateInput);

const styles = StyleSheet.create({
  years: {
    flexDirection: 'row',
  },
  yearItem: {
    paddingRight: theme().space(2),
  },
  months: {
    flexDirection: 'row',
    paddingTop: theme().space(2),
  },
  monthItem: {
    paddingRight: theme().space(3),
  },
  days: {
    flexDirection: 'row',
    paddingTop: theme().space(2),
  },
  dayItem: {
    paddingRight: theme().space(4),
  },
});
