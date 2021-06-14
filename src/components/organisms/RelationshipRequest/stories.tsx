import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import {
  relationshipRequests,
  relationshipRequest,
} from '__mockData__/relationshipRequest';
import Notification, { Props as NotificationProps } from './Notification';
import Card, { Props as CardProps } from './Card';
import List, { Props as ListProps } from './List';

const notificationProps = (): NotificationProps => ({
  count: 3,
  onPress: mockFn('onPress'),
});

const cardProps = (): CardProps => ({
  ...relationshipRequest(),
  onOK: mockFn('onOK'),
  onNG: mockFn('onNG'),
  ngRequesting: false,
  acceptRequesting: false,
});
const listProps = (): ListProps => ({
  items: relationshipRequests(),
  pageInfo: {
    hasNextPage: false,
    endCursor: '',
  },
  onLoadMore: mockFn('onLoadMore'),
  loading: false,
  onOK: mockFn('onOK'),
  onNG: mockFn('onNG'),
  ngRequesting: false,
  acceptRequesting: false,
});

storiesOf('organisms/RelationshipRequest', module)
  .add('Notification', () => <Notification {...notificationProps()} />)
  .add('Card', () => <Card {...cardProps()} />)
  .add('List', () => <List {...listProps()} />);
