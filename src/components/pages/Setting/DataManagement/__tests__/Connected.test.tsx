import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import * as useFirebaseAuth from 'hooks/useFirebaseAuth';
import { user } from '__mockData__/user';
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
  });

  it('正常にrenderすること', () => {
    testRenderer(<Connected {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
