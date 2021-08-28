import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { appConfig } from '__mockData__/appConfig';
import Page, { Props } from './Page';

const props = (): Props => ({
  ...appConfig({
    maintenance: true,
    maintenanceMessage:
      'システムメンテナンス終了まで、もうしばらくお待ち下さい。',
    maintenancePeriod: '2021年1月1日 10:00〜12:00',
  }),
  getMaintenance: () => null,
});

storiesOf('templates/Maintenance', module).add('Page', () => (
  <Page {...props()} />
));
