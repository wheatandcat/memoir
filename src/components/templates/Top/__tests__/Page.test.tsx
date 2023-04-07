import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  loading: false,
  onAppleLogin: jest.fn(),
  onGoogleLogin: jest.fn(),
  onSkip: jest.fn(),
  onLogin: jest.fn(),
});

describe('components/templates/Top/Page.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
