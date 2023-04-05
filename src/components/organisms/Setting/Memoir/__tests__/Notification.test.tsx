import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Notification, { Props } from '../Notification';

const propsData = (): Props => ({
  push: 0,
  setPush: jest.fn(),
});

describe('components/organisms/Setting/Memoir/Notification.tsx', () => {
  beforeEach(() => {
    testRenderer(<Notification {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
