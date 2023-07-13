import React from 'react';
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

export default {
  title: 'organisms/Intro',
};

export const _Intro = () => <Intro {...introProps()} />;
export const _Notification = () => <Notification {...notificationProps()} />;
export const _Task = () => <Task {...taskProps()} />;
