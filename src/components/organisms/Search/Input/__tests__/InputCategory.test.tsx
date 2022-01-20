import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import InputCategory, { Props } from '../InputCategory';

const propsData = (): Props => ({});

describe('components/organisms/Search/Input/InputCategory.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<InputCategory {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
