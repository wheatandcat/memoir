import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import View from 'components/atoms/View';
import CategoryButton from './CategoryButton';

storiesOf('molecules', module).add('CategoryButton', () => (
  <View>
    <View m={2}>
      <CategoryButton name="趣味" onPress={mockFn('onPress')} />
    </View>
    <View m={2}>
      <CategoryButton name="趣味" selected onPress={mockFn('onPress')} />
    </View>
  </View>
));
