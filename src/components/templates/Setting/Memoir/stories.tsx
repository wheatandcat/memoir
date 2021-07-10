import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Page, { Props } from './Page';

const props = (): Props => ({
  ...memoirNotificationSetting(),
  onSave: mockFn('onSave'),
});

storiesOf('templates/Setting/Memoir', module).add('Page', () => (
  <Page {...props()} />
));
