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
  beforeEach(() => {
    testRenderer(<Plain {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
