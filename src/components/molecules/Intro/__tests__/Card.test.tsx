import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Card, { Props } from '../Card';

const propsData = (): Props => ({
  source: require('../../../img/common/intro_01.png'),
  text: '記録する\nふりかえる\n共有する',
  onNext: jest.fn(),
});

describe('components/molecules/Intro/Card.tsx', () => {
  beforeEach(() => {
    testRenderer(<Card {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
