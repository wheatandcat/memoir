import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Sent, { Props } from '../Sent';

const propsData = (): Props => ({
  displayName: 'test',
});

describe('components/organisms/AddShareUser/InputModal/Sent.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Sent {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
