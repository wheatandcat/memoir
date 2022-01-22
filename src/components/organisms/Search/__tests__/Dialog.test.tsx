import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { users } from '__mockData__/user';
import Dialog, { Props } from '../Dialog';

const propsData = (): Props => ({
  users: users(),
});

describe('components/organisms/Search/Dialog.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Dialog {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
