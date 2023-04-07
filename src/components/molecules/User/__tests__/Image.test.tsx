import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Image, { Props } from '../Image';

const propsData = (): Props => ({ image: null });

describe('components/molecules/User/Image.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Image {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
