import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { relationshipRequests } from '__mockData__/relationshipRequest';
import Page, { Props } from './Page';

const props = (): Props => ({
  items: relationshipRequests(),
  pageInfo: { hasNextPage: false, endCursor: '' },
  loading: false,
  onLoadMore: mockFn('onLoadMore'),
  onOK: mockFn('onOK'),
  onNG: mockFn('onNG'),
});

storiesOf('templates/Setting/RelationshipRequests', module).add('Page', () => (
  <Page {...props()} />
));
