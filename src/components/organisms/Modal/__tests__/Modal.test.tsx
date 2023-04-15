import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Modal, { Props } from '../';

const propsData = (): Props => ({
  isVisible: true,
  loading: false,
  title: 'title',
  buttonTitle: 'buttonTitle',
  disabledButton: false,
  height: 100,
  onClose: jest.fn(),
  onPress: jest.fn(),
  children: <div>children</div>,
});

describe('components/organisms/Modal/Modal.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Modal {...propsData()} />)();
    expect(screen.findAllByText('buttonTitle')).toBeTruthy();
  });
});
