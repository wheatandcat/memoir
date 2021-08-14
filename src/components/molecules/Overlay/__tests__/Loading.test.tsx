import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Loading, { Props } from '../Loading';

const propsData = (): Props => ({ text: 'テスト' });

describe('components/molecules/Overlay/Loading.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Loading {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
