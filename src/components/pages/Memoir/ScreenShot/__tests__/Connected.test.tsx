import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import { user } from '__mockData__/user';
import * as client from '@apollo/client';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  selectedUserIDList: ['1'],
  categoryID: 0,
  like: true,
  dislike: true,
});

describe('components/pages/Memoir/ScreenShot/Connected.tsx', () => {
  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      ...user(),
    }));
    jest.spyOn(client, 'useQuery').mockImplementation((): any => ({
      loading: false,
      data: null,
      error: undefined,
    }));
  });

  it('正常にrenderすること', () => {
    testRenderer(<Connected {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
