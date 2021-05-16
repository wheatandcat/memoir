import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Image, { Props } from '../Image';

const propsData = (): Props => ({ image: null });

describe('components/molecules/User/Image.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Image {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
