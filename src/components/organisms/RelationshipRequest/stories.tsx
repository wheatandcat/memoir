import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Notification, { Props } from './Notification';
import { mockFn } from 'storyBookUtils/index';

const props = (): Props => ({
  count: 3,
  onPress: mockFn('onPress'),
});

storiesOf('organisms/RelationshipRequest', module).add('Notification', () => (
  <Notification {...props()} />
));
