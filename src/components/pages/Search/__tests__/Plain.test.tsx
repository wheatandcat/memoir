import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { users } from '__mockData__/user';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  users: users(),
  onSearch: jest.fn(),
});

describe('components/pages/Search/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
