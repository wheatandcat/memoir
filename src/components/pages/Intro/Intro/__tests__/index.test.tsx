import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import IndexPage from '../';

const propsData = () => ({ onFinish: jest.fn() });

describe('components/pages/Intro/Intro/index.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<IndexPage {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
