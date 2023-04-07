import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import ProfileImage, { Props } from '../ProfileImage';

const propsData = (): Props => ({
  authenticated: true,
  image: '',
  onChangeImage: jest.fn(),
});

describe('components/organisms/UpdateProfile/ProfileImage.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<ProfileImage {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
