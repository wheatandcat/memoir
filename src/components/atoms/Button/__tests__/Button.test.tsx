import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Button, { Props } from '../';

const propsData = (): Props => ({
  size: 'sm',
  width: 100,
  title: 'title',
  loading: false,
  disabled: false,
  onPress: jest.fn(),
});

describe('components/atoms/Button/Button.tsx', () => {
  beforeEach(() => {
    testRenderer(<Button {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
