import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Categories, { Props } from '../';

const propsData = (): Props => ({
  categoryID: 1,
  onPress: jest.fn(),
});

describe('components/organisms/Categories/Categories.tsx', () => {
  beforeEach(() => {
    testRenderer(<Categories {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
