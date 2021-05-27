import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { invite } from '__mockData__/Invite';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  invite: invite(),
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
