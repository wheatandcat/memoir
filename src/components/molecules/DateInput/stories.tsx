import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Years from './Years';

storiesOf('molecules/DateInput', module).add('Years', () => (
  <Years date="2020-01-01" years={[2020, 2021]} onPress={() => null} />
));
