import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import { items } from '__mockData__/item';
import Page from './Page';

export default {
  title: 'templates/Home',
};

export const _Page = () => (
  <Page
    items={items()}
    loading={false}
    date="2021-02-21"
    addItemLoading={false}
    openSettingModal={false}
    openAddItemModal={false}
    onItem={mockFn('onItem')}
    onMemoir={mockFn('onMemoir')}
    onCloseSettingModal={mockFn('onCloseSettingModal')}
    onChangeDate={() => null}
    onAddItem={mockFn('onAddItem')}
    onOpenAddItem={mockFn('onOpenAddItem')}
    onCloseAddItem={mockFn('onCloseAddItem')}
  />
);
