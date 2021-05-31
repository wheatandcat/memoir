import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Blinking, { Props } from './Blinking';

const props = (): Props => ({});

storiesOf('atoms/Animated', module).add('Blinking', () => (
  <Blinking {...props()} />
));
