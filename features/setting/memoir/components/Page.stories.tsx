import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import Page, { type Props } from './Page';

const props = (): Props => ({
  ...memoirNotificationSetting(),
  onSave: mockFn('onSave'),
});

export default {
  title: 'templates/Setting/Memoir',
};

export const _Page = () => <Page {...props()} />;
