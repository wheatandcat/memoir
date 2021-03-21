import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Menu from './Menu';

storiesOf('organisms/Menu', module).add('Menu', () => (
  <Menu
    items={[
      {
        text: '削除',
        color: 'error',
        onPress: mockFn('item1'),
      },
      {
        text: '編集',
        color: 'secondary',
        onPress: mockFn('item2'),
      },
    ]}
  />
));
