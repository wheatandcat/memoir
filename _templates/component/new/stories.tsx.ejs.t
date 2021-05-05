---
to: <%= absPath %>/stories.tsx
---
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import <%= navigationName %>, { Props } from './<%= component_name %>';

const props = (): Props => ({});

storiesOf('<%= storiesPath %>', module).add('<%= component_name %>', () => (
  <<%= navigationName %> {...props()} />
));
