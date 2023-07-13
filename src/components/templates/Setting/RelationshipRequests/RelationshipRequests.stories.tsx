import React from 'react';
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
  ngRequesting: false,
  acceptRequesting: false,
});

export default {
  title: 'templates/Setting/RelationshipRequests',
};

export const _Page = () => <Page {...props()} />;
