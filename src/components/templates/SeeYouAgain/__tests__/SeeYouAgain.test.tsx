import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SeeYouAgain, { Props } from '../SeeYouAgain';

const propsData = (): Props => ({});

describe('components/templates/SeeYouAgain/SeeYouAgain.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<SeeYouAgain {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
