import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Intro, { Props } from '../Intro';

const propsData = (): Props => ({});

describe('components/organisms/Intro/Intro.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Intro {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
