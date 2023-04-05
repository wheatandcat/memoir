import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import NotFound, { Props } from '../NotFound';

const propsData = (): Props => ({ loading: false });

describe('components/molecules/RelationshipRequest/NotFound.tsx', () => {
  beforeEach(() => {
    testRenderer(<NotFound {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
