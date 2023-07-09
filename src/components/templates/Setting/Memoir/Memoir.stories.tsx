import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Page, { Props } from './Page';

const props = (): Props => ({
  ...memoirNotificationSetting(),
  onSave: mockFn('onSave'),
});

export default {
  title: 'templates/Setting/Memoir',
};

export const _Page = () => <Page {...props()} />;
