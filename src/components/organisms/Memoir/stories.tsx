import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';
import DateCards, { Props } from './DateCards';
import { items } from '__mockData__/item';

const props = (): Props => ({
  items: items(),
  pageInfo: {
    hasNextPage: false,
    endCursor: '',
  },
  onItem: mockFn('onItem'),
  onLoadMore: mockFn('onLoadMore'),
  loading: false,
});

storiesOf('organisms/Memoir', module).add('DateCards', () => (
  <View style={styles.root}>
    <DateCards {...props()} />
  </View>
));

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: theme().color.background.main,
  },
});
