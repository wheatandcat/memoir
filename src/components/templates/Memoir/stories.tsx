import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page from './Page';

storiesOf('templates/Memoir', module).add('Page', () => (
  <Page onItem={mockFn('onItem')} />
));
