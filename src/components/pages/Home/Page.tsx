import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

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

const Page = () => {
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <View>
            <View style={styles.years}>
              {years.map((year) => (
                <TouchableOpacity key={year}>
                  <View style={styles.yearItem}>
                    <Text>{year}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.months}>
              {months.map((month) => (
                <TouchableOpacity key={month}>
                  <View style={styles.monthItem}>
                    <Text>{month}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  root: {},
  inner: {
    height: '100%',
  },
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
