import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Recoil from 'recoil';
import * as useFirebaseAuth from 'hooks/useFirebaseAuth';
import Connected, { Props } from '../Connected';
import * as client from '@apollo/client';

const propsData = (): Props => ({
  onSkip: jest.fn(),
  setCreate: jest.fn(),
  create: false,
  isExistUser: false,
});

describe('components/pages/Top/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest.spyOn(useFirebaseAuth, 'default').mockImplementation((): any => ({
      setup: true,
      onAppleLogin: jest.fn(),
      onGoogleLogin: jest.fn(),
    }));
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      uid: null,
    }));
    jest.spyOn(client, 'useMutation').mockImplementation((): any => [
      jest.fn(),
      {
        loading: false,
      },
    ]);
    jest
      .spyOn(client, 'useLazyQuery')
      .mockImplementation((): any => [
        jest.fn(),
        { loading: false, data: null },
      ]);

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
