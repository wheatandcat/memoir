import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import InputCategory, { Props } from '../InputCategory';

const propsData = (): Props => ({
  categoryID: 0,
  onPress: jest.fn(),
});

describe('components/organisms/Search/Input/InputCategory.tsx', () => {
  beforeEach(() => {
    testRenderer(<InputCategory {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
