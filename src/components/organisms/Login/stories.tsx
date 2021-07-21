import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Form, { Props } from './Form';

const props = (): Props => ({
  onAppleLogin: mockFn('onAppleLogin'),
  onGoogleLogin: mockFn('onGoogleLogin'),
});

storiesOf('organisms/Login', module).add('Form', () => <Form {...props()} />);
