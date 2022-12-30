import React, { memo, useState, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Divider from 'components/atoms/Divider';
import View from 'components/atoms/View';
import dayjs from 'lib/dayjs';
import InputYear from 'components/molecules/DateInput/Years';
import InputMonth from 'components/molecules/DateInput/Months';
import InputDay from 'components/molecules/DateInput/Days';
import usePrevious from 'hooks/usePrevious';
import Text from 'components/atoms/Text';
import theme from 'config/theme';

const years = () => {
  const lastYear = dayjs().year();
  const value: number[] = [];

  for (let i = 2020; i <= lastYear; i++) {
    value.push(i);
  }

  return value;
};
const months = [
  {
    label: '1/Jun',
    value: 1,
  },
  {
    label: '2/Feb',
    value: 2,
  },
  {
    label: '3/Mar',
    value: 3,
  },
  {
    label: '4/Apr',
    value: 4,
  },
  {
    label: '5/May',
    value: 5,
  },
  {
    label: '6/Jun',
    value: 6,
  },
  {
    label: '7/Jul',
    value: 7,
  },
  {
    label: '8/Aug',
    value: 8,
  },
  {
    label: '9/Sep',
    value: 9,
  },
  {
    label: '10/Oct',
    value: 10,
  },
  {
    label: '11/Nov',
    value: 11,
  },
  {
    label: '12/Dec',
    value: 12,
  },
];

const getDays = (date: string): string[] => {
  const end = dayjs(date).daysInMonth();
  const items = [];
  for (let i = 0; i < end; i++) {
    items.push(dayjs(date).date(1).add(i, 'days').format('YYYY-MM-DD'));
  }

  return items;
};

type Props = {
  date: string;
  firstItem?: boolean;
  onChange: (date: string) => void;
};

type State = {
  date: string;
};

const initialState = (props: Props): State => ({
  date: dayjs(props.date).format('YYYY-MM-DD'),
});

const DateInput: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState(props));
  const prevDate = usePrevious(props.date);

  useEffect(() => {
    if (prevDate && prevDate !== props.date) {
      setState((s) => ({ ...s, date: props.date }));
    } else {
      if (props.date !== state.date) {
        props.onChange(state.date);
      }
    }
  }, [state.date, props, prevDate]);

  const onYear = useCallback(
    (year: number) => {
      const date = dayjs(state.date).format(`${year}-MM-DD`);

      setState((s) => ({ ...s, date }));
    },
    [state.date]
  );

  const onMonth = useCallback(
    (month: string) => {
      let date = dayjs(state.date).format(`YYYY-${month}-DD`);

      if (dayjs(date).month() + 1 !== Number(month)) {
        // 設定月に、その日が存在しない場合は、月の末日を設定
        date = dayjs(date).add(-1, 'month').endOf('month').format('YYYY-MM-DD');
      }

      setState((s) => ({ ...s, date }));
    },
    [state.date]
  );

  const onDay = useCallback(
    (day: string) => {
      const date = dayjs(state.date).format(`YYYY-MM-${day}`);

      setState((s) => ({ ...s, date }));
    },
    [state.date]
  );

  const onToday = useCallback(() => {
    const date = dayjs().format('YYYY-MM-DD');

    setState((s) => ({ ...s, date }));
  }, []);

  return (
    <View>
      <View pl={2} py={2}>
        <InputYear
          year={dayjs(state.date).format('YYYY')}
          years={years()}
          onPress={onYear}
        />
      </View>
      <Divider my={2} />
      <View pl={2}>
        <InputMonth
          month={dayjs(state.date).format('M')}
          months={months}
          onPress={onMonth}
          firstItem={props.firstItem}
        />

        <Divider my={2} />
        <View pb={2} style={styles.dateInput}>
          <View style={styles.date}>
            <InputDay
              day={dayjs(state.date).format('D')}
              days={getDays(state.date)}
              onPress={onDay}
              firstItem={props.firstItem}
            />
          </View>
          <View style={styles.buttonRoot}>
            <TouchableOpacity onPress={onToday}>
              <View style={styles.button}>
                <Text size="xs" textAlign="center">
                  今日
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Divider mt={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  date: {
    width: '80%',
    overflow: 'hidden',
  },
  buttonRoot: {
    width: '20%',
    marginHorizontal: theme().space(2),
  },
  button: {
    backgroundColor: theme().color.primary.main,
    borderRadius: 100,
    height: 35,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(DateInput);
