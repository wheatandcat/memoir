import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import * as useFirebaseAuth from 'hooks/useFirebaseAuth';
import { user } from '__mockData__/user';
import * as client from '@apollo/client';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/DataManagement/Connected.tsx', () => {
  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      ...user(),
    }));
    jest.spyOn(useFirebaseAuth, 'default').mockImplementation((): any => ({
      setupAuth: jest.fn(),
      onLogout: jest.fn(),
    }));
    jest
      .spyOn(client, 'useMutation')
      .mockImplementation((): any => [
        jest.fn(),
        { loading: false, error: null },
      ]);
    jest.spyOn(client, 'useQuery').mockImplementation((): any => ({
      loading: false,
      data: {
        relationships: {
          edges: [],
        },
      },
      error: undefined,
      refetch: jest.fn(),
    }));
    testRenderer(<Connected {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
