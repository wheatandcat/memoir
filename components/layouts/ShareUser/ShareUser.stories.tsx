import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import { user } from '__mockData__/user';
import { relationships } from '__mockData__/relationship';
import List, { type Props as ListProps } from './List';
import User, { type Props as UserProps } from './User';

const listProps = (): ListProps => ({
  relationships: relationships(),
  onAdd: mockFn('onAdd'),
  deleting: false,
  onDeleteRelationship: mockFn('onDeleteRelationship'),
});

const userProps = (): UserProps => ({
  user: {
    ...user(),
    userID: '',
  },
  loading: false,
  onDeleteRelationship: mockFn('onDeleteRelationship'),
});

export default {
  title: 'organisms/ShareUser',
};

export const _List = () => <List {...listProps()} />;
export const _User = () => <User {...userProps()} />;
