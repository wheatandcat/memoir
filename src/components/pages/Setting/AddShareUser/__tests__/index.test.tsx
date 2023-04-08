import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen, waitFor } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import IndexPage, { Props } from '../';

const propsData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {},
    },
  } as any);

describe('components/pages/Setting/AddShareUser/index.tsx', () => {
  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      id: 'test-id',
      displayName: 'test-name',
    }));
  });

  it('正常にrenderすること', async () => {
    testRenderer(<IndexPage {...propsData()} />)();
    await waitFor(async () => {
      expect(screen.findByTestId('atoms_loading')).toBeTruthy();
      // ステート更新が終わるまで待つ
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
  });
});
