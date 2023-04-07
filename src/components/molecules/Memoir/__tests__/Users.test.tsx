import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Users, { Props } from '../Users';

const propsData = (): Props => ({
  selectedUserIDList: ['test'],
  onChangeUserID: jest.fn(),
  users: [
    {
      id: 'test',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
});

describe('components/molecules/Memoir/Users.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Users {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
