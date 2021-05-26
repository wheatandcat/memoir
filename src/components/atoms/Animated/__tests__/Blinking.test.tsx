import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Blinking, { Props } from '../Blinking';

const propsData = (): Props => ({});

describe('components/atoms/Animated/Blinking.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Blinking {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
