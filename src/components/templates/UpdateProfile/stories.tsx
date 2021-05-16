import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({
  user: {
    id: 'test-id',
    displayName: 'test-name',
    image: '',
  },
  loading: false,
  onSave: mockFn('onSave'),
});

storiesOf('templates/UpdateProfile', module).add('Page', () => (
  <Page {...props()} />
));
