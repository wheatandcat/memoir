import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { items } from '__mockData__/item';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  items: items(),
  loading: false,
  error: undefined,
  addItemLoading: false,
  date: '2020-01-01',
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

describe('components/pages/Home/Plain.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Plain {...propsData()} />)();
    expect(screen.findAllByText('今週のmemoirを確認する')).toBeTruthy();
  });
});
