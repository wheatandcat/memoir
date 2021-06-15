import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { user } from '__mockData__/user';
import { relationships } from '__mockData__/relationship';
import List, { Props as ListProps } from './List';
import User, { Props as UserProps } from './User';

const listProps = (): ListProps => ({
  relationships: relationships(),
  onAdd: mockFn('onAdd'),
  deleting: false,
  onDeleteRelationship: mockFn('onDeleteRelationship'),
});

const userProps = (): UserProps => ({
  user: user(),
  loading: false,
  onDeleteRelationship: mockFn('onDeleteRelationship'),
});

storiesOf('organisms/ShareUser', module)
  .add('List', () => <List {...listProps()} />)
  .add('User', () => <User {...userProps()} />);
