---
to: <%= templatePath %>/__tests__/Page.test.tsx
---
import React from 'react';
import { testRenderer } from '@/lib/testUtil';
import { screen } from '@testing-library/react-native';
import Page, { Props } from '../Page';

const propsData = (): Props => ({});

describe('components/templates/<%= componentName %>/Page.tsx', () => {
  it('正常にrenderすること', async () => {
    testRenderer(<P {...propsData()} />)();

    expect(screen.findAllByText('')).toBeTruthy();
  });
});
