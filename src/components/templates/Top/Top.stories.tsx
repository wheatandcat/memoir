import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({
  loading: false,
  onAppleLogin: mockFn('onAppleLogin'),
  onGoogleLogin: mockFn('onGoogleLogin'),
  onSkip: mockFn('onSkip'),
  onLogin: mockFn('onLogin'),
});

export default {
  title: 'templates/Top',
};

export const _Page = () => <Page {...props()} />;
