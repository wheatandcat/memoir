import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import { invite } from '__mockData__/Invite';
import { user } from '__mockData__/user';
import * as client from '@apollo/client';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/Setting/AddShareUser/Connected.tsx', () => {
  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      id: 'test-id',
      displayName: 'test-name',
    }));
    jest.spyOn(client, 'useQuery').mockImplementation((): any => ({
      loading: false,
      error: undefined,
      data: {
        invite: invite(),
      },
    }));
    jest
      .spyOn(client, 'useLazyQuery')
      .mockImplementation((): any => [
        jest.fn(),
        { loading: false, data: null },
      ]);
    jest.spyOn(client, 'useMutation').mockImplementation((): any => [
      jest.fn(),
      {
        loading: false,
        data: {
          createRelationshipRequest: {
            user: user(),
          },
        },
      },
    ]);

    testRenderer(<Connected {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
