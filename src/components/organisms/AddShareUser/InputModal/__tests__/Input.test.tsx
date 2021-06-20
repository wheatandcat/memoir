import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Input, { Props } from '../Input';

const propsData = (): Props => ({
  code: '',
  onChange: jest.fn(),
});

describe('components/organisms/AddShareUser/InputModal/Input.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Input {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
