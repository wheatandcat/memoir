import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Notification, { Props } from '../Notification';

const propsData = (): Props => ({
  ...memoirNotificationSetting(),
  onSaveNotification: jest.fn(),
  onNext: jest.fn(),
});

describe('components/organisms/Intro/Notification.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Notification {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
