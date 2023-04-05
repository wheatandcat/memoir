import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import { user } from '__mockData__/user';
import { relationships } from '__mockData__/relationship';
import * as client from '@apollo/client';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/Search/Connected.tsx', () => {
  jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
    ...user(),
  }));
  jest.spyOn(client, 'useQuery').mockImplementation((): any => ({
    loading: false,
    data: {
      relationships: {
        edges: relationships(),
      },
    },
    error: undefined,
    refetch: jest.fn(),
  }));

  beforeEach(() => {
    testRenderer(<Connected {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
