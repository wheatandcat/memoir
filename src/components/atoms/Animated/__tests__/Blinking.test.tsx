import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Blinking, { Props } from '../Blinking';

const propsData = (): Props => ({});

describe('components/atoms/Animated/Blinking.tsx', () => {
  beforeEach(() => {
    testRenderer(<Blinking {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
