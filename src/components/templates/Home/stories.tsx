import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page from './Page';

storiesOf('templates/Home', module).add('Page', () => (
  <Page
    onItem={mockFn('onItem')}
    onAddItem={mockFn('onAdd')}
    onMemoir={mockFn('onMemoir')}
  />
));
