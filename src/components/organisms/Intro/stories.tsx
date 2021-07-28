import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Intro, { Props } from './Intro';

const props = (): Props => ({});

storiesOf('organisms/Intro', module).add('Intro', () => <Intro {...props()} />);
