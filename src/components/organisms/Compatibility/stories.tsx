import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Compatibility from './Compatibility';

storiesOf('organisms', module).add('Compatibility', () => (
  <Compatibility
    like={true}
    dislike={false}
    onLike={mockFn('onLike')}
    onDislike={mockFn('onDislike')}
  />
));
