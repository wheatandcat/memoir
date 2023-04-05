import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { relationships } from '__mockData__/relationship';
import List, { Props } from '../List';

const propsData = (): Props => ({
  onAdd: jest.fn(),
  deleting: false,
  onDeleteRelationship: jest.fn(),
  relationships: relationships(),
});

describe('components/organisms/ShareUser/List.tsx', () => {
  beforeEach(() => {
    testRenderer(<List {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
