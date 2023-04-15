import React from 'react';
import * as Recoil from 'recoil';
import { items } from '__mockData__/item';
import * as useHomeItems from 'hooks/useHomeItems';
import * as client from '@apollo/client';
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
  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      items: items(),
    }));
    jest.spyOn(Recoil, 'useRecoilState').mockImplementation((): any => [
      {
        date: '2020-01-01',
      },
      jest.fn(),
    ]);
    jest.spyOn(useHomeItems, 'default').mockImplementation((): any => ({
      loading: false,
      error: null,
      refetch: jest.fn(),
    }));
    jest
      .spyOn(client, 'useQuery')
      .mockImplementation((): any => [jest.fn(), { loading: false }]);
    jest.spyOn(client, 'useMutation').mockImplementation((): any => [
      jest.fn(),
      {
        loading: false,
      },
    ]);
  });

  describe('Home', () => {
    it('正常にrenderすること', () => {
      testRenderer(<Home {...propsHomeData()} />)();
      expect(screen.findAllByText('今週のmemoirを確認する')).toBeTruthy();
    });
  });
});
