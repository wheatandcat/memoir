import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
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

describe('components/pages/UpdateProfile/index.tsx', () => {
  beforeEach(() => {
    jest
      .spyOn(Recoil, 'useRecoilState')
      .mockImplementation((): any => [
        { id: 'test-id', displayName: 'test-name' },
        jest.fn(),
      ]);
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      uid: 'test',
    }));
  });

  it('正常にrenderすること', () => {
    testRenderer(<IndexPage {...propsData()} />)();
    expect(screen.findAllByText('保存')).toBeTruthy();
  });
});
