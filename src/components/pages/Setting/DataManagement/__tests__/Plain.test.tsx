import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  error: undefined,
  disabledDeleteButton: false,
  onDelete: jest.fn(),
});

describe('components/pages/DataManagement/Plain.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Plain {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
