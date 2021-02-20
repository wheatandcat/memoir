import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import InputDateWrap from './InputDateWrap';

storiesOf('organisms', module).add('InputDateWrap', () => (
  <InputDateWrap date="2020-01-01" onChangeDate={mockFn} />
));
