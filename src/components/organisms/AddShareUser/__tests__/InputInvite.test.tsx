import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import InputInvite, { Props } from '../InputInvite';

const propsData = (): Props => ({
  onOpen: jest.fn(),
});

describe('components/organisms/AddShareUser/InputInvite.tsx', () => {
  beforeEach(() => {
    testRenderer(<InputInvite {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
