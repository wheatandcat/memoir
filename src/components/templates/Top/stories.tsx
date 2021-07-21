import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({
  onAppleLogin: mockFn('onAppleLogin'),
  onGoogleLogin: mockFn('onGoogleLogin'),
  onSkip: mockFn('onSkip'),
});

storiesOf('templates/Top', module).add('Page', () => <Page {...props()} />);
