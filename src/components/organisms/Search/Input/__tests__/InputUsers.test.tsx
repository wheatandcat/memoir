import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import InputUsers, { Props } from '../InputUsers';

const propsData = (): Props => ({
  users: [
    {
      id: 'test1',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
    {
      id: 'test2',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
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
