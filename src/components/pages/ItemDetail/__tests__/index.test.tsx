import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import ItemDetail, { Props } from '../';

const propsHomeData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        date: '2020-01-01',
        id: 'test',
      },
    },
  } as any);

describe('components/pages/ItemDetail/index.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<ItemDetail {...propsHomeData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
