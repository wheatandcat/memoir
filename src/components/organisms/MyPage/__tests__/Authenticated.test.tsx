import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { user } from '__mockData__/user';
import Authenticated, { Props } from '../Authenticated';

const propsData = (): Props => ({
  user: user(),
  onUpdateProfile: jest.fn(),
  onLogout: jest.fn(),
});

describe('components/organisms/MyPage/Authenticated.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Authenticated {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
