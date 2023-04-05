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
      params: {
        startDate: '2020-01-01',
        endDate: '2020-01-07',
      },
    },
  } as any);

describe('components/pages/Memoir/ScreenShot/index.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<IndexPage {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
