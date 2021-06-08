import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { invite } from '__mockData__/Invite';
import { user } from '__mockData__/user';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  invite: invite(),
  user: user(),
  loading: false,
  creating: false,
  updating: false,
  requesting: false,
  requestUser: null,
  onCreateInvite: jest.fn(),
  onUpdateInvite: jest.fn(),
  onSearchInviteCode: jest.fn(),
});

describe('components/templates/Setting/AddShareUser/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
