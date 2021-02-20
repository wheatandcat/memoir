import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Page from './Page';

storiesOf('templates/Home', module).add('Page', () => (
  <Page
    date="2021-02-21"
    openSettingModal={false}
    onItem={mockFn('onItem')}
    onMemoir={mockFn('onMemoir')}
    onCloseSettingModal={mockFn('onCloseSettingModal')}
    onChangeDate={mockFn}
  />
));
