import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';
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

storiesOf('templates/Memoir', module).add('Page', () => <Page {...props()} />);
