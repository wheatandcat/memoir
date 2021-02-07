import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import AddButton from './AddButton';

storiesOf('molecules/Card', module).add('AddButton', () => (
  <AddButton onPress={mockFn('onPress')} />
));
