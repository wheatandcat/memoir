import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { users } from '__mockData__/user';
import InputUsers, { Props } from '../InputUsers';

const propsData = (): Props => ({
  users: users(),
  userIDList: [],
  onAdd: jest.fn(),
  onRemove: jest.fn(),
});

describe('components/organisms/Search/Input/InputUsers.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<InputUsers {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
