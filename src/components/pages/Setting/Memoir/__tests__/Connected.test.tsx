import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as useMemoirNotificationSetting from 'hooks/useMemoirNotificationSetting';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/Setting/Memoir/Connected.tsx', () => {
  beforeEach(() => {
    jest
      .spyOn(useMemoirNotificationSetting, 'default')
      .mockImplementation((): any => ({
        ...memoirNotificationSetting(),
        loading: false,
        onSave: jest.fn(),
      }));
  });

  it('正常にrenderすること', () => {
    testRenderer(<Connected {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
