import React from 'react';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import { mockFn } from 'storyBookUtils/index';
import IconButton from './';

storiesOf('molecules', module).add('IconButton', () => (
  <View>
    <View p={2}>
      <IconButton name="more-vert" size="sm" onPress={mockFn('onPress')} />
    </View>
    <View p={2}>
      <IconButton name="more-vert" size="base" onPress={mockFn('onPress')} />
    </View>
    <View p={2}>
      <IconButton name="more-vert" size="lg" onPress={mockFn('onPress')} />
    </View>
  </View>
));
