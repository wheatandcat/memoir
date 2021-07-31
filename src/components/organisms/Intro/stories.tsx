import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Intro from './Intro';

const introProps = () => ({
  ...memoirNotificationSetting(),
  onSaveNotification: mockFn('onSave'),
  onStep: mockFn('onStep'),
  step: 0,
});

storiesOf('organisms/Intro', module).add('Intro', () => (
  <Intro {...introProps()} />
));
