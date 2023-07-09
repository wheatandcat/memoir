import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import AddButton, { Props } from './AddButton';

const props = (): Props => ({
  onAdd: mockFn('onAdd'),
});

export default {
  title: 'molecules/ShareUser',
};

export const _AddButton = () => <AddButton {...props()} />;

_AddButton.story = {
  name: 'AddButton',
};
