import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import InviteCard, { Props } from '../InviteCard';

const propsData = (): Props => ({});

describe('components/organisms/AddShareUser/InviteCard.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<InviteCard {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
