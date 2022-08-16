import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Button, { Props } from '../Button';

const propsData = (): Props => ({
  size: 'sm',
  width: 100,
  title: 'title',
  loading: false,
  disabled: false,
  onPress: jest.fn(),
});

describe('components/atoms/Button/Button.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Button {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
