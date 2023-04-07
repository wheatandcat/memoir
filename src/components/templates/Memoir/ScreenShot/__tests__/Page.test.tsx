import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { items } from '__mockData__/item';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  items: items().map((v) => ({ ...v, userID: 'test' })),
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  users: [
    {
      id: 'test',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
});

describe('components/templates/Memoir/ScreenShot/Page.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
