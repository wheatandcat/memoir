import React from 'react';
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

export default {
  title: 'templates/Contact',
};

export const _Page = () => <Page {...props()} />;
