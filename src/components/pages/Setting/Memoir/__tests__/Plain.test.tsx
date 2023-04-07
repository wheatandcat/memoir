import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  onSave: jest.fn(),
  data: memoirNotificationSetting(),
});

describe('components/pages/Setting/Memoir/Plain.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Plain {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
