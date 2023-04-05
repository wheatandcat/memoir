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
  beforeEach(() => {
    testRenderer(<NotAuthenticated {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
