---
to: <%= absPath %>/__tests__/<%= component_name %>.test.tsx
---
import React from 'react';
import { testRenderer } from '@/lib/testUtil';
import { screen } from '@testing-library/react-native';
import <%= component_name %>, { Props } from '../<%= component_name %>';

const propsData = (): Props => ({});

describe('<%= testName %>.tsx', () => {
  it('正常にrenderすること', async () => {
    testRenderer(<<%= component_name %> {...propsData()} />)();

    expect(screen.findAllByText('')).toBeTruthy();
  });
});
