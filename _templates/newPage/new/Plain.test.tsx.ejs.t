---
to: <%= absPath %>/__tests__/Plain.test.tsx
---
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected, { Props } from '../Plain';

const propsData = (): Props => ({});

describe('components/pages/<%= componentName %>/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<IndexPage {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});



