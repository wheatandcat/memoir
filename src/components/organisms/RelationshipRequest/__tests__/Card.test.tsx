import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { relationshipRequest } from '__mockData__/relationshipRequest';
import Card, { Props } from '../Card';

const propsData = (): Props => ({
  ...relationshipRequest(),
  onOK: jest.fn(),
  onNG: jest.fn(),
  ngRequesting: false,
  acceptRequesting: false,
});

describe('components/organisms/RelationshipRequest/Card.tsx', () => {
  beforeEach(() => {
    testRenderer(<Card {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
