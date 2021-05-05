import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';
import DateCards, { Props } from './DateCards';
import { items, item } from '__mockData__/item';
import Card from './Card';

const props = (): Props => ({
  items: items(),
  pageInfo: {
    hasNextPage: false,
    endCursor: '',
  },
  onItem: mockFn('onItem'),
  onLoadMore: mockFn('onLoadMore'),
  loading: false,
  startDate: '2020-01-01',
  endDate: '2020-01-07',
});

storiesOf('organisms/Memoir/DateCards', module)
  .add('default', () => (
    <View style={styles.root}>
      <DateCards {...props()} />
    </View>
  ))
  .add('loading', () => (
    <View style={styles.root}>
      <DateCards {...props()} loading />
    </View>
  ));

storiesOf('organisms/Memoir', module).add('Card', () => (
  <Card
    {...item()}
    user={{ id: 'test', name: 'test太郎' }}
    onPress={mockFn('onPress')}
  />
));

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: theme().color.background.main,
  },
});
