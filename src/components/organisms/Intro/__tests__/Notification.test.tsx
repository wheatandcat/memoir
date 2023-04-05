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
  beforeEach(() => {
    testRenderer(<Notification {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
