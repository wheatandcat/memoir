import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Input, { Props } from './Input';

const props = (): Props => ({
  dayOfWeek: 0,
  time: new Date('0000-01-01T00:00:00'),
  onChangeDayOfWeek: mockFn('onChangeDayOfWeek'),
  onChangeTime: mockFn('onChangeTime'),
});

storiesOf('organisms/Setting/Memoir', module).add('Input', () => (
  <Input {...props()} />
));
