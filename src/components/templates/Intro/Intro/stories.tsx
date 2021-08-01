import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Page, { Props } from './Page';

const props = (): Props => ({
  ...memoirNotificationSetting(),
  onSaveNotification: mockFn('onSaveNotification'),
  onFinish: mockFn('onFinish'),
});

storiesOf('templates/Intro/Intro', module).add('Page', () => (
  <Page {...props()} />
));
