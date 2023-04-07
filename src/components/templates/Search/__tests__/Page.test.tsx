import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { users } from '__mockData__/user';
import Page, { Props } from '../Page';
import mockdate from 'mockdate';

const propsData = (): Props => ({
  users: users(),
  onSearch: jest.fn(),
});

describe('components/templates/Search/Page.tsx', () => {
  mockdate.set('2020-01-01 00:00:00');

  it('正常にrenderすること', () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
