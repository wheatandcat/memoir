import React from 'react';
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

export default {
  title: 'templates/Setting/AcceptedRelationship',
};

export const _Page = () => <Page {...props()} />;
