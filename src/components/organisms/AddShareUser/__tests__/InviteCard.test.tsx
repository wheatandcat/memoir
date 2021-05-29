import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { invite } from '__mockData__/Invite';
import { user } from '__mockData__/user';
import InviteCard, { Props } from '../InviteCard';

const propsData = (): Props => ({
  loading: false,
  invite: invite(),
  user: user(),
  onCreateInvite: jest.fn(),
});

describe('components/organisms/AddShareUser/InviteCard.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<InviteCard {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
