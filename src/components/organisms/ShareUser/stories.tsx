import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import List, { Props } from './List';

const props = (): Props => ({
  onAdd: mockFn('onAdd'),
});

storiesOf('organisms/ShareUser', module).add('List', () => (
  <List {...props()} />
));
