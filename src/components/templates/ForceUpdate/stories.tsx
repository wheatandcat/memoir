import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Page, { Props } from './Page';

const props = (): Props => ({});

storiesOf('templates/ForceUpdate', module).add('Page', () => (
  <Page {...props()} />
));
