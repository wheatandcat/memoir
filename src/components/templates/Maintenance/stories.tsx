import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Page, { Props } from './Page';

const props = (): Props => ({
  maintenance: true,
  maintenanceMessage:
    'システムメンテナンス終了まで、もうしばらくお待ち下さい。',
  maintenancePeriod: '2021年1月1日 10:00〜12:00',
  getMaintenance: () => null,
});

storiesOf('templates/Maintenance', module).add('Page', () => (
  <Page {...props()} />
));
