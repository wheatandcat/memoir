import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import * as Recoil from 'recoil';
import * as client from '@apollo/client';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/UpdateProfile/Connected.tsx', () => {
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
    jest
      .spyOn(client, 'useMutation')
      .mockImplementation((): any => [jest.fn(), { loading: false }]);
    testRenderer(<Connected {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
