import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Header, { Props } from '../Header';

const propsData = (): Props => ({
  startDate: '2020-01-01',
  endDate: '2020-01-07',
});

describe('components/molecules/Memoir/Header.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Header {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
