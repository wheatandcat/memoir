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
  selectedUserIDList: ['test'],
  onChangeUserID: mockFn('onChangeUserID'),
  onScreenShot: mockFn('onScreenShot'),
  search: false,
});

storiesOf('templates/Memoir/Page', module)
  .add('ユーザー:1人', () => <Page {...props()} />)
  .add('ユーザー:複数', () => (
    <Page
      {...props()}
      users={[
        {
          id: 'test',
          displayName: 'suzuki',
          image: 'https://placehold.jp/150x150.png',
        },
        {
          id: 'test2',
          displayName: 'suzuki',
          image: 'https://placehold.jp/250x250.png',
        },
        {
          id: 'test3',
          displayName: 'suzuki',
          image: 'https://placehold.jp/350x350.png',
        },
      ]}
    />
  ));
