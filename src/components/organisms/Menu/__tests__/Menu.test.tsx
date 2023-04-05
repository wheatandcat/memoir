import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Menu, { Props } from '../Menu';

const propsData = (): Props => ({
  items: [
    {
      text: 'text',
      color: 'primary',
      onPress: jest.fn(),
      removeMenu: false,
    },
  ],
});

describe('components/organisms/Menu/Menu.tsx', () => {
  beforeEach(() => {
    testRenderer(<Menu {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
