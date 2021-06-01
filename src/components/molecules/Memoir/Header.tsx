import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import dayjs from 'lib/dayjs';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';

export type Props = {
  startDate: string;
  endDate: string;
};

const Header: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View>
        <Text variants="logo" textAlign="center">
          memoir
        </Text>
      </View>
      <View style={styles.date}>
        <Text variants="middle" textAlign="center" color="baseLight">
          {dayjs(props.startDate).format('YYYY.MM.DD')} -{' '}
          {dayjs(props.endDate).format('YYYY.MM.DD')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    width: '100%',
  },
  date: {
    justifyContent: 'center',
    backgroundColor: theme().color.secondary.main,
    marginHorizontal: theme().space(3),
    marginVertical: theme().space(3),
    paddingVertical: theme().space(0),
  },
});

export default memo(Header);
