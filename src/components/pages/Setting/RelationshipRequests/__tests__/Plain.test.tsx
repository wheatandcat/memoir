import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { relationshipRequests } from '__mockData__/relationshipRequest';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  items: relationshipRequests(),
  pageInfo: { hasNextPage: false, endCursor: '' },
  loading: false,
  error: undefined,
  onLoadMore: jest.fn(),
  onOK: jest.fn(),
  onNG: jest.fn(),
  ngRequesting: false,
  acceptRequesting: false,
});

describe('components/pages/Setting/RelationshipRequests/Plain.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Plain {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
