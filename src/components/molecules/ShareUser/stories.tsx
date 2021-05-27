import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import AddButton, { Props } from './AddButton';

const props = (): Props => ({
  onAdd: mockFn('onAdd'),
});

storiesOf('molecules/ShareUser', module).add('AddButton', () => (
  <AddButton {...props()} />
));
