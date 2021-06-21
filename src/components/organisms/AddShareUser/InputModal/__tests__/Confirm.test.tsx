import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Confirm, { Props } from '../Confirm';

const propsData = (): Props => ({
  displayName: 'test',
  image: '',
  onNG: jest.fn(),
  onOK: jest.fn(),
  requesting: false,
});

describe('components/organisms/AddShareUser/InputModal/Confirm.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Confirm {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
