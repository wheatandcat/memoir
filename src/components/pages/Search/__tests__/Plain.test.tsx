import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { users } from '__mockData__/user';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  users: users(),
  onSearch: jest.fn(),
});

describe('components/pages/Search/Plain.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Plain {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
