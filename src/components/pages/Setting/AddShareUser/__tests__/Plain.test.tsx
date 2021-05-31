import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { invite } from '__mockData__/Invite';
import { user } from '__mockData__/user';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  error: undefined,
  data: {
    invite: invite(),
  },
  user: user(),
  creating: false,
  updating: false,
  onCreateInvite: jest.fn(),
  onUpdateInvite: jest.fn(),
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
