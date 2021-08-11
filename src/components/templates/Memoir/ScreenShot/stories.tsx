import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { items } from '__mockData__/item';
import Page, { Props } from './Page';

const props = (): Props => ({
  items: items().map((v) => ({ ...v, userID: 'test' })),
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  users: [
    {
      id: 'test',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
});

storiesOf('templates/Memoir/ScreenShot', module).add('Page', () => (
  <Page {...props()} />
));
