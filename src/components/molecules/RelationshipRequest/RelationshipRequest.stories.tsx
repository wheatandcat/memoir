import React from 'react';
import NotFound, { Props } from './NotFound';

const props = (): Props => ({ loading: false });

export default {
  title: 'molecules/RelationshipRequest',
};

export const _NotFound = () => <NotFound {...props()} />;

_NotFound.story = {
  name: 'NotFound',
};
