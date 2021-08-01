import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Intro from './Intro';
import Notification, { Props as NotificationProps } from './Notification';
import Task, { Props as TaskProps } from './Task';

const introProps = () => ({
  ...memoirNotificationSetting(),
  onSaveNotification: mockFn('onSave'),
  onFinish: mockFn('onFinish'),
});

const notificationProps = (): NotificationProps => ({
  ...memoirNotificationSetting(),
  onSaveNotification: mockFn('onStep'),
  onNext: mockFn('onNext'),
});

const taskProps = (): TaskProps => ({
  onFinish: mockFn('onFinish'),
});

storiesOf('organisms/Intro', module)
  .add('Intro', () => <Intro {...introProps()} />)
  .add('Notification', () => <Notification {...notificationProps()} />)
  .add('Task', () => <Task {...taskProps()} />);
