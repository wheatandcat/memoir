import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';
import DateCards, { Props } from './DateCards';
import { items, item } from '__mockData__/item';
import Card from './Card';
import ScreenShot, { Props as ScreenShotProps } from './ScreenShot';

const props = (): Props => ({
  items: items().map((v) => ({ ...v, userID: 'test' })),
  pageInfo: {
    hasNextPage: false,
    endCursor: '',
  },
  onItem: mockFn('onItem'),
  onLoadMore: mockFn('onLoadMore'),
  loading: false,
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  users: [
    {
      id: 'test',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
});

const screenShotProps = (): ScreenShotProps => ({
  items: items().map((v) => ({ ...v, userID: 'test' })),
  loading: false,
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  users: [
    {
      id: 'test',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
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
    user={{
      id: 'test',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    }}
    onPress={mockFn('onPress')}
  />
));

storiesOf('organisms/Memoir/ScreenShot', module).add('default', () => (
  <View style={styles.root}>
    <ScreenShot {...screenShotProps()} />
  </View>
));

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: theme().color.background.main,
  },
});
