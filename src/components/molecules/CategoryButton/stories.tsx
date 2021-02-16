import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import View from 'components/atoms/View';
import CategoryButton from './CategoryButton';

storiesOf('molecules', module).add('CategoryButton', () => (
  <View>
    <View m={2}>
      <CategoryButton onPress={mockFn('onPress')} />
    </View>
    <View m={2}>
      <CategoryButton selected onPress={mockFn('onPress')} />
    </View>
  </View>
));
