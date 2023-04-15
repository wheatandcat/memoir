import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import AddButton, { Props } from '../AddButton';

const propsData = (): Props => ({
  onAdd: jest.fn(),
});

describe('components/molecules/ShareUser/AddButton.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<AddButton {...propsData()} />)();
    expect(screen.findByTestId('add-button')).toBeTruthy();
  });
});
