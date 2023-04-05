import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Task, { Props } from '../Task';

const propsData = (): Props => ({
  onFinish: jest.fn(),
});

describe('components/organisms/Intro/Task.tsx', () => {
  beforeEach(() => {
    testRenderer(<Task {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
