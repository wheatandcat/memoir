import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import InputDate, { Props } from '../InputDate';

const propsData = (): Props => ({});

describe('components/organisms/Search/Input/InputDate.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<InputDate {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
