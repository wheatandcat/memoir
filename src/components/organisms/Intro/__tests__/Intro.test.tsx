import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Intro, { Props } from '../Intro';

const propsData = (): Props => ({
  ...memoirNotificationSetting(),
  onSaveNotification: jest.fn(),
  onFinish: jest.fn(),
});

describe('components/organisms/Intro/Intro.tsx', () => {
  beforeEach(() => {
    testRenderer(<Intro {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('記録する')).toBeTruthy();
  });
});
