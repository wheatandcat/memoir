import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Image, { Props } from '../';

const propsData = (): Props => ({
  source: require('../../../img/categories/category_book.png'),
  width: 100,
  height: 100,
});

describe('components/atoms/Image/Image.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Image {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
