---
to: <%= absPath %>/<%= component_name %>.stories.tsx
---
import React from 'react';
import <%= navigationName %>, { Props } from './<%= component_name %>';

const props = (): Props => ({});

export default {
  title: '<%= storiesPath %>'
  component: <%= navigationName %>,
  parameters: {
    ...props(),
  }
};