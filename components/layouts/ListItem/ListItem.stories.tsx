import React from 'react';
import View from '@/components/elements/View';
import { mockFn } from 'storyBookUtils/index';
import ListItem from './';

export default {
  title: 'molecules',
};

export const _ListItem = () => (
  <View>
    <ListItem title="項目1" onPress={mockFn('onPress')} />
    <ListItem title="項目2" onPress={mockFn('onPress')} />
    <ListItem divider title="項目3" onPress={mockFn('onPress')} />
  </View>
);

_ListItem.story = {
  name: 'ListItem',
};
