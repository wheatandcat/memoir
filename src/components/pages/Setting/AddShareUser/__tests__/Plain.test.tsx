import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { invite } from '__mockData__/Invite';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  error: undefined,
  data: {
    invite: invite(),
  },
});

describe('components/pages/Setting/AddShareUser/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
