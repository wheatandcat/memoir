import React from 'react';
import { testRenderer } from 'lib/testUtil';
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import * as Recoil from 'recoil';
import * as useFirebaseAuth from 'hooks/useFirebaseAuth';
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

describe('components/pages/DataManagement/index.tsx', () => {
  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      ...user(),
    }));
    jest.spyOn(useFirebaseAuth, 'default').mockImplementation((): any => ({
      setupAuth: jest.fn(),
      onLogout: jest.fn(),
    }));
  });

  it('正常にrenderすること', async () => {
    testRenderer(<IndexPage {...propsData()} />)();

    await waitForElementToBeRemoved(() => screen.getByTestId('atoms_loading'));

    await waitFor(async () => {
      expect(screen.findAllByText('アカウント削除')).toBeTruthy();
    });
  });
});
