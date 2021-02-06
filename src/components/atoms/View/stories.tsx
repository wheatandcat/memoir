import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import theme from 'config/theme';
import View from './';

storiesOf('atoms', module).add('View', () => (
  <View>
    <View mt={4} style={styles.view1} />
    <View mt={4} style={styles.view2} />
  </View>
));

const styles = StyleSheet.create({
  view1: {
    backgroundColor: theme().color.primary.main,
    width: 100,
    height: 100,
  },
  view2: {
    backgroundColor: theme().color.accent1.main,
    width: 100,
    height: 100,
  },
});
