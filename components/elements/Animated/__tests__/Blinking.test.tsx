import { screen } from '@testing-library/react-native';
import { testRenderer } from 'lib/testUtil';
import React from 'react';
import Blinking, { type Props } from '../Blinking';

const propsData = (): Props => ({});

describe('@/components/elements/Animated/Blinking.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Blinking {...propsData()} />)();
    expect(screen.findByTestId('blinking')).toBeTruthy();
  });
});
