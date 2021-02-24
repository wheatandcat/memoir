import React from 'react';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import { mockFn } from 'storyBookUtils/index';
import ListItem from './';

storiesOf('molecules', module).add('ListItem', () => (
  <View>
    <ListItem title="項目1" onPress={mockFn('onPress')} />
    <ListItem title="項目2" onPress={mockFn('onPress')} />
    <ListItem divider title="項目3" onPress={mockFn('onPress')} />
  </View>
));
