import React from 'react';
import * as Recoil from 'recoil';
import { items } from '__mockData__/item';
import * as useHomeItems from 'hooks/useHomeItems';
import * as client from '@apollo/client';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  openSettingModal: false,
  onCloseSettingModal: jest.fn(),
});

describe('components/pages/Home/Connected.tsx', () => {
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

  it('正常にrenderすること', () => {
    testRenderer(<Connected {...propsData()} />)();
    expect(screen.findAllByText('本を読む')).toBeTruthy();
  });
});
