import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Input, { Props } from '../Input';

const propsData = (): Props => ({
  code: '',
  onChange: jest.fn(),
});

describe('components/organisms/AddShareUser/InputModal/Input.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Input {...propsData()} />)();
    expect(screen.findAllByText('招待コードを入力してください')).toBeTruthy();
  });
});
