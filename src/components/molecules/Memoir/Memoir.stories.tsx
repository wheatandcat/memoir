import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import Header, { Props as HeaderProps } from './Header';
import Users, { Props as UsersProps } from './Users';

const headerProps = (): HeaderProps => ({
  startDate: '2020-01-01',
  endDate: '2020-01-07',
});

const userProps = (): UsersProps => ({
  users: [
    {
      id: '1',
      image: 'http://placehold.jp/150x150.png',
    },
    {
      id: '2',
      image: 'http://placehold.jp/250x250.png',
    },
    {
      id: '3',
      image: 'http://placehold.jp/150x150.png',
    },
    {
      id: '4',
      image: 'http://placehold.jp/250x250.png',
    },
    {
      id: '5',
      image: 'http://placehold.jp/150x150.png',
    },
  ],
  selectedUserIDList: ['1'],
  onChangeUserID: mockFn('onChangeUserID'),
});

export default {
  title: 'molecules/Memoir',
};

export const _Header = () => <Header {...headerProps()} />;
export const _Users = () => <Users {...userProps()} />;
