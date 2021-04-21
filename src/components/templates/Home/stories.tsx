import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { items } from '__mockData__/item';
import Page from './Page';

storiesOf('templates/Home', module).add('Page', () => (
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
    onChangeDate={mockFn('onChangeDate')}
    onAddItem={mockFn('onAddItem')}
    onOpenAddItem={mockFn('onOpenAddItem')}
    onCloseAddItem={mockFn('onCloseAddItem')}
  />
));
