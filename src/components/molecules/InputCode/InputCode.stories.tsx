import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import InputCode, { Props } from './InputCode';

const props = (): Props => ({
  value: '',
  onChange: mockFn('onChange'),
});

export default {
  title: 'molecules/InputCode',
};

export const _InputCode = () => <InputCode {...props()} />;

_InputCode.story = {
  name: 'InputCode',
};
