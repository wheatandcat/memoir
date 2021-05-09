import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import NotAuthenticated, { Props } from '../NotAuthenticated';

const propsData = (): Props => ({
  onLogin: jest.fn(),
});

describe('components/organisms/MyPage/NotAuthenticated.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<NotAuthenticated {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
