import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { items } from '__mockData__/item';
import Cards, { Props } from './Cards';

const props = (loading: boolean): Props => ({
  items: items(),
  onItem: mockFn('onItem'),
  onAddItem: mockFn('onAddItem'),
  loading,
  addItemLoading: false,
  date: '2021-02-21',
});

storiesOf('organisms/Cards', module)
  .add('デフォルト', () => <Cards {...props(false)} />)
  .add('ローディング', () => <Cards {...props(true)} />);
