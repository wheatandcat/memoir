import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/UpdateProfile/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
