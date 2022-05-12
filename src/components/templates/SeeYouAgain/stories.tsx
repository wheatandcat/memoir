import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SeeYouAgain, { Props } from './SeeYouAgain';

const props = (): Props => ({});

storiesOf('templates/SeeYouAgain', module).add('SeeYouAgain', () => (
  <SeeYouAgain {...props()} />
));
