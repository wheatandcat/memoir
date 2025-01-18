import { screen } from '@testing-library/react-native';
import { testRenderer } from 'lib/testUtil';
import React from 'react';
import Image, { type Props } from '../Image';

const propsData = (): Props => ({ image: null });

describe('@/components/layouts/User/Image.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Image {...propsData()} />)();
    expect(screen.findByTestId('default-user-image')).toBeTruthy();
  });
});
