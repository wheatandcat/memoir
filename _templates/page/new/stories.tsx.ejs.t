---
to: <%= templatePath %>/Page.stories.tsx
---
import React from 'react';
import Page, { Props } from './Page';

const props = (): Props => ({});

export default {
  title: '<%= storiesPath %>'
  component: Page,
  parameters: {
    ...props(),
  }
};