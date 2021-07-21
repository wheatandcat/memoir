import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  onAppleLogin: jest.fn(),
  onGoogleLogin: jest.fn(),
  onSkip: jest.fn(),
});

describe('components/templates/Top/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
