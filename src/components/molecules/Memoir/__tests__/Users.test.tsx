import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Users, { Props } from '../Users';

const propsData = (): Props => ({
  selectedUserIDList: ['test'],
  onChangeUserID: jest.fn(),
  users: [
    {
      id: 'test',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
});

describe('components/molecules/Memoir/Users.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Users {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
