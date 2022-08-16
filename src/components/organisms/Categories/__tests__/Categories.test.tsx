import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Categories, { Props } from '../';

const propsData = (): Props => ({
  categoryID: 1,
  onPress: jest.fn(),
});

describe('components/organisms/Categories/Categories.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Categories {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
