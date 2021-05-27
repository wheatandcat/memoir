import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import List, { Props } from '../List';

const propsData = (): Props => ({
  onAdd: jest.fn(),
});

describe('components/organisms/ShareUser/List.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<List {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
