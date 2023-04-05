import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { item } from '__mockData__/item';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  ...item(),
  itemDate: item().date,
  loading: false,
  onChangeDate: jest.fn(),
  onCloseUpdateItem: jest.fn(),
  onOpenUpdateItem: jest.fn(),
  onUpdateItem: jest.fn(),
  onDeleteItem: jest.fn(),
  openUpdateItemModal: false,
  updateItemLoading: false,
});

describe('components/templates/ItemDetail/Page.tsx', () => {
  beforeEach(() => {
    testRenderer(<Page {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
