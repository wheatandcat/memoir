import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Card from './Card';

storiesOf('organisms/Card', module).add('Card', () => (
  <Card onPress={mockFn('onPress')} />
));
