import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  error: undefined,
  data: {
    itemsInPeriod: {
      pageInfo: {
        endCursor: '',
        hasNextPage: false,
      },
      edges: [],
    },
  },
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  users: [],
});

describe('components/pages/Memoir/ScreenShot/Plain.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Plain {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
