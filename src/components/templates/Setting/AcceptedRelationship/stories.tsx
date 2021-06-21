import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { user } from '__mockData__/user';
import Page, { Props } from './Page';

const props = (): Props => ({
  user: {
    ...user(),
    userID: '',
  },
  displayName: 'suzuki',
  image: '',
});

storiesOf('templates/Setting/AcceptedRelationship', module).add('Page', () => (
  <Page {...props()} />
));
