import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({
  loading: false,
  onAppleLogin: mockFn('onAppleLogin'),
  onGoogleLogin: mockFn('onGoogleLogin'),
});

export default {
  title: 'templates/Login',
};

export const _Page = () => <Page {...props()} />;
