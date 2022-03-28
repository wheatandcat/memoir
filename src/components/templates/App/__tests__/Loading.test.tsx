import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Loading, { Props } from '../Loading';

const propsData = (): Props => ({});

describe('components/templates/App/Loading.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Loading {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
