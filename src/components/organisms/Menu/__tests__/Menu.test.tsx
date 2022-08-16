import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Menu, { Props } from '../Menu';

const propsData = (): Props => ({
  items: [
    {
      text: 'text',
      color: 'primary',
      onPress: jest.fn(),
      removeMenu: false,
    },
  ],
});

describe('components/organisms/Menu/Menu.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Menu {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
