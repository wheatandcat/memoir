import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Image, { Props } from '../';

const propsData = (): Props => ({
  source: require('../../../img/categories/category_book.png'),
  width: 100,
  height: 100,
});

describe('components/atoms/Image/Image.tsx', () => {
  beforeEach(() => {
    testRenderer(<Image {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
