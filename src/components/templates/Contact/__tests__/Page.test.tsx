import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  userID: 'abc',
  loading: false,
  onContact: jest.fn(),
  onChangeText: jest.fn(),
  onClose: jest.fn(),
  text: '',
  send: false,
});

describe('components/templates/Contact/Page.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText('コメント')).toBeTruthy();
  });
});
