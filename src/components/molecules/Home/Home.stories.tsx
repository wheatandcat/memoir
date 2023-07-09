import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import AddButton from './AddButton';
import MemoirButton from './MemoirButton';

export default {
  title: 'molecules/Home',
};

export const _AddButton = () => <AddButton onPress={mockFn('onPress')} />;

_AddButton.story = {
  name: 'AddButton',
};

export const _MemoirButton = () => <MemoirButton onPress={mockFn('onPress')} />;

_MemoirButton.story = {
  name: 'MemoirButton',
};
