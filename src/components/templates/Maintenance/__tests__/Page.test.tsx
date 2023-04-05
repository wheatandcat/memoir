import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { appConfig } from '__mockData__/appConfig';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  ...appConfig({
    maintenance: true,
    maintenanceMessage:
      'システムメンテナンス終了まで、もうしばらくお待ち下さい。',
    maintenancePeriod: '2021年1月1日 10:00〜12:00',
  }),
  getMaintenance: jest.fn(),
});

describe('components/templates/Maintenance/Page.tsx', () => {
  beforeEach(() => {
    testRenderer(<Page {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
