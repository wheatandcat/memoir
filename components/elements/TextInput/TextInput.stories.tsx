import React from 'react';
import View from 'components/atoms/View';
import TextInput from './';

export default {
  title: 'atoms',
};

export const _TextInput = () => (
  <View p={3}>
    <TextInput placeholder="タイトル" />
  </View>
);

_TextInput.story = {
  name: 'TextInput',
};
