import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import InputCode, { Props } from '../InputCode';

const propsData = (): Props => ({
  value: '',
  onChange: jest.fn(),
});

describe('components/molecules/InputCode/InputCode.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<InputCode {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
