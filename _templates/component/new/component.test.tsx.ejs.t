---
to: <%= absPath %>/__tests__/<%= component_name %>.test.tsx
---
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import <%= component_name %>, { Props } from '../<%= component_name %>';

const propsData = (): Props => ({});

describe('<%= testName %>.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<<%= component_name %> {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
