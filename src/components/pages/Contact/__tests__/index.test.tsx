import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import IndexPage, { Props } from '../';

const propsData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(),
    },
    route: {
      params: {},
    },
  } as any);

describe('components/pages/Contact/index.tsx', () => {
  it('正常にrenderすること', async () => {
    testRenderer(<IndexPage {...propsData()} />)();

    expect(screen.findAllByText('コメント')).toBeTruthy();
  });
});
