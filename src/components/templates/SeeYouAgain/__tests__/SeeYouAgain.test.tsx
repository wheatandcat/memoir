import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import SeeYouAgain, { Props } from '../SeeYouAgain';

const propsData = (): Props => ({});

describe('components/templates/SeeYouAgain/SeeYouAgain.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<SeeYouAgain {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
