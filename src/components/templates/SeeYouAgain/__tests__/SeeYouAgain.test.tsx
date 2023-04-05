import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import SeeYouAgain, { Props } from '../SeeYouAgain';

const propsData = (): Props => ({});

describe('components/templates/SeeYouAgain/SeeYouAgain.tsx', () => {
  beforeEach(() => {
    testRenderer(<SeeYouAgain {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
