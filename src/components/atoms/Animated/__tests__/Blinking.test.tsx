import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Blinking, { Props } from '../Blinking';

const propsData = (): Props => ({});

describe('components/atoms/Animated/Blinking.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Blinking {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
