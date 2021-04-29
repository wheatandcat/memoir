import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({
  onAppleLogin: mockFn('onAppleLogin'),
});

storiesOf('templates/Login', module).add('Page', () => <Page {...props()} />);
