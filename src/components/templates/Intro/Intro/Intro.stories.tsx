import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Page, { Props } from './Page';

const props = (): Props => ({
  ...memoirNotificationSetting(),
  onSaveNotification: mockFn('onSaveNotification'),
  onFinish: mockFn('onFinish'),
});

export default {
  title: 'templates/Intro/Intro',
};

export const _Page = () => <Page {...props()} />;
