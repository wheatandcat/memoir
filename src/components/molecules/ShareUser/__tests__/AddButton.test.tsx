import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import AddButton, { Props } from '../AddButton';

const propsData = (): Props => ({
  onAdd: jest.fn(),
});

describe('components/molecules/ShareUser/AddButton.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<AddButton {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
