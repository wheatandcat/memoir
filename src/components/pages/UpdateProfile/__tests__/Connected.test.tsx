import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/UpdateProfile/Connected.tsx', () => {
  beforeEach(() => {
    jest
      .spyOn(Recoil, 'useRecoilState')
      .mockImplementation((): any => [
        { id: 'test-id', displayName: 'test-name' },
        jest.fn(),
      ]);
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      uid: 'test',
    }));
  });

  it('正常にrenderすること', () => {
    testRenderer(<Connected {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
