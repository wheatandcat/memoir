import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { user } from '__mockData__/user';
import { relationships } from '__mockData__/relationship';
import Page, { Props } from './Page';

const props = (): Props => ({
  onLogin: mockFn('onLogin'),
  onLogout: mockFn('onLogout'),
  onUpdateProfile: mockFn('onUpdateProfile'),
  onAddShareUser: mockFn('onAddShareUser'),
  onRelationshipRequests: mockFn('onRelationshipRequests'),
  user: {
    ...user(),
    userID: '',
  },
  relationshipRequestCount: 3,
  relationships: relationships(),
  deleting: false,
  onDeleteRelationship: mockFn('onDeleteRelationship'),
});

storiesOf('templates/MyPage', module)
  .add('ログイン前', () => <Page {...props()} />)
  .add('ログイン後', () => <Page {...props()} authenticated />);
