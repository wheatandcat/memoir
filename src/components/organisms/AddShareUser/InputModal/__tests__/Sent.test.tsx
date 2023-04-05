import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Sent, { Props } from '../Sent';

const propsData = (): Props => ({
  displayName: 'test',
});

describe('components/organisms/AddShareUser/InputModal/Sent.tsx', () => {
  beforeEach(() => {
    testRenderer(<Sent {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
