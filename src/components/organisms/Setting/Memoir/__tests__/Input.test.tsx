import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Input, { Props } from '../Input';

const propsData = (): Props => ({
  dayOfWeek: 0,
  time: new Date('0000-01-01T00:00:00'),
  onChangeDayOfWeek: jest.fn(),
  onChangeTime: jest.fn(),
});

describe('components/organisms/Setting/Memoir/Input.tsx', () => {
  beforeEach(() => {
    testRenderer(<Input {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
