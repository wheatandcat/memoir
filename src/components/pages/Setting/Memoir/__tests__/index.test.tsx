import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as useMemoirNotificationSetting from 'hooks/useMemoirNotificationSetting';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';

import IndexPage, { Props } from '../';

const propsData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {},
    },
  } as any);

describe('components/pages/Setting/Memoir/index.tsx', () => {
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
    testRenderer(<IndexPage {...propsData()} />)();
    expect(screen.findAllByText('保存')).toBeTruthy();
  });
});
