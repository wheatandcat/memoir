import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Loading, { Props } from '../Loading';

const propsData = (): Props => ({});

describe('components/templates/App/Loading.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Loading {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
