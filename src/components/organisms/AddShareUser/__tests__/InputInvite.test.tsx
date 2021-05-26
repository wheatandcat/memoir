import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import InputInvite, { Props } from '../InputInvite';

const propsData = (): Props => ({
  onOpen: jest.fn(),
});

describe('components/organisms/AddShareUser/InputInvite.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<InputInvite {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
