import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { Home, Props } from '../';

const propsHomeData = (): Props =>
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

describe('components/pages/Home/index.tsx', () => {
  describe('Home', () => {
    it('正常にrenderすること', () => {
      testRenderer(<Home {...propsHomeData()} />)();
      expect(screen.findAllByText('今週のmemoirを確認する')).toBeTruthy();
    });
  });
});
