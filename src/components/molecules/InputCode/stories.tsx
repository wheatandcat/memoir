import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import InputCode, { Props } from './InputCode';

const props = (): Props => ({
  value: '',
  onChange: mockFn('onChange'),
});

storiesOf('molecules/InputCode', module).add('InputCode', () => (
  <InputCode {...props()} />
));
