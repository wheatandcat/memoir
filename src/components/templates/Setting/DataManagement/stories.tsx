import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({
  loading: false,
  disabledDeleteButton: false,
  onDelete: mockFn('onDelete'),
});

storiesOf('templates/Setting/DataManagement', module).add('Page', () => (
  <Page {...props()} />
));
