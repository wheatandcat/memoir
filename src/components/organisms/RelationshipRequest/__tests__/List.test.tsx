import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { mockFn } from 'storyBookUtils/index';
import { relationshipRequests } from '__mockData__/relationshipRequest';
import List, { Props } from '../List';

const propsData = (): Props => ({
  items: relationshipRequests(),
  pageInfo: {
    hasNextPage: false,
    endCursor: '',
  },
  onLoadMore: mockFn('onLoadMore'),
  loading: false,
  onOK: jest.fn(),
  onNG: jest.fn(),
  ngRequesting: false,
  acceptRequesting: false,
});

describe('components/organisms/RelationshipRequest/List.tsx', () => {
  beforeEach(() => {
    testRenderer(<List {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
