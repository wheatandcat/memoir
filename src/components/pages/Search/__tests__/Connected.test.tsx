import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import { user } from '__mockData__/user';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/Search/Connected.tsx', () => {
  jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
    ...user(),
  }));

  it('正常にrenderすること', () => {
    testRenderer(<Connected {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
