import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import AddButton, { Props } from '../AddButton';

const propsData = (): Props => ({
  onAdd: jest.fn(),
});

describe('components/molecules/ShareUser/AddButton.tsx', () => {
  beforeEach(() => {
    testRenderer(<AddButton {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
