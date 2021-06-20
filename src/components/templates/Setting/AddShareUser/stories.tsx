import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { invite } from '__mockData__/Invite';
import { user } from '__mockData__/user';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({
  invite: invite(),
  user: {
    ...user(),
    userID: '',
  },
  loading: false,
  creating: false,
  updating: false,
  requesting: false,
  requestUser: null,
  onCreateInvite: mockFn('onCreateInvite'),
  onUpdateInvite: mockFn('onUpdateInvite'),
  onSearchInviteCode: mockFn('onSearchInviteCode'),
  onCreateRelationshipRequest: mockFn('onCreateRelationshipRequest'),
  confirmUser: null,
});

storiesOf('templates/Setting/AddShareUser', module).add('Page', () => (
  <Page {...props()} />
));
