import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({
  onLogin: mockFn('onLogin'),
  onLogout: mockFn('onLogout'),
  onUpdateProfile: mockFn('onUpdateProfile'),
});

storiesOf('templates/MyPage', module)
  .add('ログイン前', () => <Page {...props()} />)
  .add('ログイン後', () => <Page {...props()} authenticated />);
