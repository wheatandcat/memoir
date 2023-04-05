import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { users } from '__mockData__/user';
import InputUsers, { Props } from '../InputUsers';

const propsData = (): Props => ({
  users: users(),
  userIDList: [],
  onAdd: jest.fn(),
  onRemove: jest.fn(),
});

describe('components/organisms/Search/Input/InputUsers.tsx', () => {
  beforeEach(() => {
    testRenderer(<InputUsers {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
