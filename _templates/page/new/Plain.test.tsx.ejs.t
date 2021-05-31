---
to: <%= absPath %>/__tests__/Plain.test.tsx
---
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  error: undefined,
});

describe('components/pages/<%= componentName %>/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
