import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import IndexPage, { Props } from '../';

const propsData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {},
    },
  } as any);

describe('components/pages/DataManagement/index.tsx', () => {
  beforeEach(() => {
    testRenderer(<IndexPage {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
