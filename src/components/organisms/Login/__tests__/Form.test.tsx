import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Form, { Props } from '../Form';

const propsData = (): Props => ({
  onAppleLogin: jest.fn(),
  onGoogleLogin: jest.fn(),
});

describe('components/organisms/Login/Form.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Form {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
