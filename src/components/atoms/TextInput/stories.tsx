import React from 'react';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import TextInput from './';

storiesOf('atoms', module).add('TextInput', () => (
  <View p={3}>
    <TextInput placeholder="タイトル" />
  </View>
));
