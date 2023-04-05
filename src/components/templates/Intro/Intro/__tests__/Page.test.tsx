import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  ...memoirNotificationSetting(),
  onSaveNotification: jest.fn(),
  onFinish: jest.fn(),
});

describe('components/templates/Intro/Intro/Page.tsx', () => {
  beforeEach(() => {
    testRenderer(<Page {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
