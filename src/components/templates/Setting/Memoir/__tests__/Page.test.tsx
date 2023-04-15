import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  ...memoirNotificationSetting(),
  onSave: jest.fn(),
});

describe('components/templates/Setting/Memoir/Page.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText('保存')).toBeTruthy();
  });
});
