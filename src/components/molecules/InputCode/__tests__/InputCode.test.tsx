import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import InputCode, { Props } from '../InputCode';

const propsData = (): Props => ({
  value: '',
  onChange: jest.fn(),
});

describe('components/molecules/InputCode/InputCode.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<InputCode {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
