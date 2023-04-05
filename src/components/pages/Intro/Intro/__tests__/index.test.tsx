import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import IndexPage from '../';

const propsData = () => ({ onFinish: jest.fn() });

describe('components/pages/Intro/Intro/index.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<IndexPage {...propsData()} />)();
    expect(screen.findAllByText('記録する')).toBeTruthy();
  });
});
