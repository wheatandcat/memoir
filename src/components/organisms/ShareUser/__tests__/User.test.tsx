import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { user } from '__mockData__/user';
import User, { Props } from '../User';

const propsData = (): Props => ({
  user: {
    ...user(),
    userID: '',
  },
  loading: false,
  onDeleteRelationship: jest.fn(),
});

describe('components/organisms/ShareUser/User.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<User {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
