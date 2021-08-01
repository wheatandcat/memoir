import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Task, { Props } from '../Task';

const propsData = (): Props => ({
  onFinish: jest.fn(),
});

describe('components/organisms/Intro/Task.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Task {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
