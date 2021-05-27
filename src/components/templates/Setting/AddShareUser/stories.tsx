import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { invite } from '__mockData__/Invite';
import Page, { Props } from './Page';

const props = (): Props => ({
  invite: invite(),
});

storiesOf('templates/Setting/AddShareUser', module).add('Page', () => (
  <Page {...props()} />
));
