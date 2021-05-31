import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import InputDialog, { Props } from '../InputModal';

const propsData = (): Props => ({
  isVisible: true,
  onClose: jest.fn(),
});

describe('components/organisms/AddShareUser/InputModal.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<InputDialog {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
