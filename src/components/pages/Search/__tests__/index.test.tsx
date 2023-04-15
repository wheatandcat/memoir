import React from 'react';
import * as Recoil from 'recoil';
import { testRenderer } from 'lib/testUtil';
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { user } from '__mockData__/user';
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

describe('components/pages/Search/index.tsx', () => {
  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      ...user(),
    }));
  });

  it('正常にrenderすること', async () => {
    testRenderer(<IndexPage {...propsData()} />)();

    await waitForElementToBeRemoved(() => screen.getByTestId('atoms_loading'));

    await waitFor(async () => {
      expect(screen.findByText('検索')).toBeTruthy();
    });
  });
});
