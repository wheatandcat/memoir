import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';
import { items } from '__mockData__/item';

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

storiesOf('templates/Memoir', module).add('Page', () => <Page {...props()} />);
