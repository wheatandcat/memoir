import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';

export type Props = {};

const InputDate: React.FC<Props> = () => {
  return (
    <View pt={3} style={styles.inputDate}>
      <View style={styles.dateText}>
        <Text variants="middle">2021.12.01</Text>
      </View>
      <View mx={2}>
        <Text>-</Text>
      </View>
      <View style={styles.dateText}>
        <Text variants="middle">2021.12.31</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputDate: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateText: {
    borderColor: theme().color.secondary.main,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default memo(InputDate);
