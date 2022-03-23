import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Loading, { Props } from './Loading';

const props = (): Props => ({});

storiesOf('templates/App', module).add('Loading', () => (
  <Loading {...props()} />
));
