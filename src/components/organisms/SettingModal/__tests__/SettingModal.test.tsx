import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import SettingModal, { Props } from '../';

const propsData = (): Props => ({
  isVisible: true,
  onClose: jest.fn(),
});

describe('components/organisms//SettingModal.tsx', () => {
  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      uid: 'abc',
    }));
    testRenderer(<SettingModal {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
