---
to: <%= templatePath %>/stories.tsx
---
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({});

storiesOf('<%= templatePath %>', module).add('Page', () => (
  <Page
    {...props()}
  />
));

