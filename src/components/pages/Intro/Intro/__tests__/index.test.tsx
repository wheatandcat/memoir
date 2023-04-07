import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as useMemoirNotificationSetting from 'hooks/useMemoirNotificationSetting';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import IndexPage from '../';

const propsData = () => ({ onFinish: jest.fn() });

describe('components/pages/Intro/Intro/index.tsx', () => {
  beforeEach(() => {
    jest
      .spyOn(useMemoirNotificationSetting, 'default')
      .mockImplementation((): any => ({
        ...memoirNotificationSetting(),
        loading: false,
        onSave: jest.fn(),
      }));
  });

  it('正常にrenderすること', async () => {
    testRenderer(<IndexPage {...propsData()} />)();
    expect(screen.findAllByText('SKIP')).toBeTruthy();
  });
});
