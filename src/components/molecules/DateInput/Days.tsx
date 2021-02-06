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

type Props = {
  date: string;
  days: string[];
  onPress: (day: string) => void;
};

const DayInput: React.FC<Props> = (props) => {
  const getDayOfWeekColor = (day: string, selected: boolean) => {
    const dayOfWeek = dayjs(day).format('dd');

    if (selected) {
      return 'primary';
    } else if (dayOfWeek === '土') {
      return 'accent1';
    } else if (dayOfWeek === '日') {
      return 'error';
    }

    return 'secondary';
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.days}>
        {props.days.map((day) => {
          const selected =
            dayjs(day).format('D') === dayjs(props.date).format('D');

          return (
            <TouchableOpacity
              key={day}
              onPress={() => props.onPress(dayjs(day).format('DD'))}
            >
              <View style={styles.dayItem}>
                <Text
                  textAlign="center"
                  color={selected ? 'primary' : 'secondary'}
                >
                  {dayjs(day).format('D')}
                  {'\n'}
                  <Text
                    textAlign="center"
                    variants="small"
                    color={getDayOfWeekColor(day, selected)}
                  >
                    {dayjs(day).format('dd')}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default memo(DayInput);

const styles = StyleSheet.create({
  days: {
    flexDirection: 'row',
    paddingTop: theme().space(2),
  },
  dayItem: {
    paddingRight: theme().space(4),
  },
});
