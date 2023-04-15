---
to: <%= absPath %>/__tests__/index.test.tsx
---
import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import IndexPage, { Props } from '../';

const propsData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {},
    },
  } as any);

describe('components/pages/<%= componentName %>/index.tsx', () => {
  it('正常にrenderすること', async () => {
    testRenderer(<IndexPage {...propsData()} />)();

    expect(screen.findAllByText('')).toBeTruthy();
  });
});
