import React from 'react';
import { storiesOf } from '@storybook/react-native';
import InviteCard, { Props } from './InviteCard';

const props = (): Props => ({});

storiesOf('organisms/AddShareUser', module).add('InviteCard', () => (
  <InviteCard {...props()} />
));
