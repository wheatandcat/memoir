import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Header, { Props } from '../Header';

const propsData = (): Props => ({
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  isTitle: true,
});

describe('components/molecules/Memoir/Header.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Header {...propsData()} />)();
    expect(screen.findAllByText('memoir')).toBeTruthy();
  });
});
