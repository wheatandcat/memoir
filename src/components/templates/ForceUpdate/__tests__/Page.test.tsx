import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Page, { Props } from '../Page';

const propsData = (): Props => ({});

describe('components/templates/ForceUpdate/Page.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText('ストアへ')).toBeTruthy();
  });
});
