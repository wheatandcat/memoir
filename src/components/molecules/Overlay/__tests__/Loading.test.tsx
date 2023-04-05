import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Loading, { Props } from '../Loading';

const propsData = (): Props => ({ text: 'テスト' });

describe('components/molecules/Overlay/Loading.tsx', () => {
  beforeEach(() => {
    testRenderer(<Loading {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
