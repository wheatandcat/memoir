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
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.days}>
        {props.days.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => props.onPress(dayjs(day).format('DD'))}
          >
            <View style={styles.dayItem}>
              <Text
                textAlign="center"
                color={
                  dayjs(day).format('D') === dayjs(props.date).format('D')
                    ? 'primary'
                    : 'secondary'
                }
              >
                {dayjs(day).format('D')}
                {'\n'}
                {dayjs(day).format('dd')}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
