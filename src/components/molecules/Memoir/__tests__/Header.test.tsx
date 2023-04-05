import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Header, { Props } from '../Header';

const propsData = (): Props => ({
  startDate: '2020-01-01',
  endDate: '2020-01-07',
});

describe('components/molecules/Memoir/Header.tsx', () => {
  beforeEach(() => {
    testRenderer(<Header {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
