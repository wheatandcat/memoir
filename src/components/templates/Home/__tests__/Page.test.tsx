import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { items } from '__mockData__/item';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  addItemLoading: false,
  loading: false,
  date: '2020-01-01',
  items: items(),
  openAddItemModal: false,
  openSettingModal: false,
  onAddItem: jest.fn(),
  onChangeDate: jest.fn(),
  onCloseAddItem: jest.fn(),
  onCloseSettingModal: jest.fn(),
  onItem: jest.fn(),
  onMemoir: jest.fn(),
  onOpenAddItem: jest.fn(),
});

describe('components/templates/Home/Page.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
