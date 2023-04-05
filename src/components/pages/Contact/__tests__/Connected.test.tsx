import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/Contact/Connected.tsx', () => {
  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      userID: 'abc',
    }));
  });

  it('正常にrenderすること', () => {
    testRenderer(<Connected {...propsData()} />)();
    expect(screen.findAllByText('コメント')).toBeTruthy();
  });
});
