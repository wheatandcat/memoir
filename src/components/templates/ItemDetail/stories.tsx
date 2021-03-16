import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page from './Page';

storiesOf('templates/ItemDetail', module).add('Page', () => (
  <Page
    loading={false}
    date="2021-02-21"
    onChangeDate={mockFn}
    title="本を読んだ"
    categoryID={1}
  />
));
