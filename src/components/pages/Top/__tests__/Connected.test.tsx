import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import * as useFirebaseAuth from 'hooks/useFirebaseAuth';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  onSkip: jest.fn(),
  setCreate: jest.fn(),
  create: false,
  isExistUser: false,
});

describe('components/pages/Top/Connected.tsx', () => {
  beforeEach(() => {
    jest.spyOn(useFirebaseAuth, 'default').mockImplementation((): any => ({
      setup: true,
      onAppleLogin: jest.fn(),
      onGoogleLogin: jest.fn(),
    }));
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      uid: null,
    }));
  });

  it('正常にrenderすること', () => {
    testRenderer(<Connected {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
