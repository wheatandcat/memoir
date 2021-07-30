import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Intro from './Intro';
import Notification from './Notification';

const props = () => ({});

storiesOf('organisms/Intro', module)
  .add('Intro', () => <Intro {...props()} />)
  .add('Notification', () => <Notification {...props()} />);
