import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  data: memoirNotificationSetting(),
  onSaveNotification: jest.fn(),
  onFinish: jest.fn(),
});

describe('components/pages/Intro/Intro/Plain.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Plain {...propsData()} />)();
    expect(screen.findAllByText('SKIP')).toBeTruthy();
  });
});
