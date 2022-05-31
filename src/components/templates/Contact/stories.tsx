import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({
  userID: 'abc',
  loading: false,
  onContact: mockFn('onContact'),
  onChangeText: mockFn('onChangeText'),
  onClose: mockFn('onClose'),
  text: '',
  send: false,
});

storiesOf('templates/Contact', module).add('Page', () => <Page {...props()} />);
