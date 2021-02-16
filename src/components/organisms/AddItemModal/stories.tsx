import React from 'react';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import { mockFn } from 'storyBookUtils/index';
import AddItemModal from './';

storiesOf('organisms', module).add('AddItemModal', () => (
  <View>
    <AddItemModal
      isVisible
      date="2020-01-01"
      onClose={mockFn('onClose')}
      onAdd={mockFn('onCategory')}
    />
  </View>
));
