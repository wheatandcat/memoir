import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Recoil from 'recoil';
import * as useFirebaseAuth from 'hooks/useFirebaseAuth';
import Connected, { Props } from '../Connected';
import * as queries from 'queries/api/index';

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
    jest
      .spyOn(queries, 'useCreateAuthUserMutation')
      .mockImplementation((): any => [jest.fn()]);
    jest
      .spyOn(queries, 'useExistAuthUserLazyQuery')
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
