import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Page, { Props } from './Page';

const props = (): Props => ({
  ...memoirNotificationSetting(),
  onSaveNotification: mockFn('onSave'),
  onStep: mockFn('onStep'),
  step: 0,
});

storiesOf('templates/Intro/Notification', module).add('Page', () => (
  <Page {...props()} />
));
