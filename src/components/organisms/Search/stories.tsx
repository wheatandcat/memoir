import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Dialog, { Props } from './Dialog';

const props = (): Props => ({
  users: [
    {
      id: 'test1',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
    {
      id: 'test2',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
});

storiesOf('organisms/Search', module).add('Dialog', () => (
  <Dialog {...props()} />
));
