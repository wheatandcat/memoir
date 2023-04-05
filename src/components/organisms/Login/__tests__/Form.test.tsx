import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Form, { Props } from '../Form';

const propsData = (): Props => ({
  onAppleLogin: jest.fn(),
  onGoogleLogin: jest.fn(),
});

describe('components/organisms/Login/Form.tsx', () => {
  beforeEach(() => {
    testRenderer(<Form {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
