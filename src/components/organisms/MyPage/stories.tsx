import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { user } from '__mockData__/user';
import NotAuthenticated, {
  Props as NotAuthenticatedProps,
} from './NotAuthenticated';
import Authenticated, { Props as AuthenticatedProps } from './Authenticated';

const props1 = (): NotAuthenticatedProps => ({
  onLogin: mockFn('onLogin'),
});

const props2 = (): AuthenticatedProps => ({
  user: user(),
  onLogout: mockFn('onLogout'),
  onUpdateProfile: mockFn('onUpdateProfile'),
  onAddShareUser: mockFn('onAddShareUser'),
});

storiesOf('organisms/MyPage', module)
  .add('NotAuthenticated', () => <NotAuthenticated {...props1()} />)
  .add('Authenticated', () => <Authenticated {...props2()} />);
