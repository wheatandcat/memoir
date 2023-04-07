import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  onCallback: jest.fn(),
});

describe('components/pages/Setting/RelationshipRequests/Connected.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Connected {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
