import React from 'react';
import { storiesOf } from '@storybook/react-native';
import DateInput from './DateInput';

storiesOf('organisms/DateInput', module).add('default', () => (
  <DateInput date="2021-01-01" />
));
