import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { user } from '__mockData__/user';
import NotAuthenticated, { Props } from '../NotAuthenticated';

const propsData = (): Props => ({
  user: {
    ...user(),
    userID: '',
  },
  onLogin: jest.fn(),
  onUpdateProfile: jest.fn(),
});

describe('components/organisms/MyPage/NotAuthenticated.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<NotAuthenticated {...propsData()} />)();
    expect(screen.findAllByText('サインイン')).toBeTruthy();
  });
});
