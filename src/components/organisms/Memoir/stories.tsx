import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';
import DateCards from './DateCards';

storiesOf('organisms/Memoir', module).add('DateCards', () => (
  <View style={styles.root}>
    <DateCards onItem={mockFn('onItem')} />
  </View>
));

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: theme().color.background.main,
  },
});
