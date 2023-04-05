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
  beforeEach(() => {
    testRenderer(<ProfileImage {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
