import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Modal, { Props } from '../';

const propsData = (): Props => ({
  isVisible: true,
  loading: false,
  title: 'title',
  buttonTitle: 'buttonTitle',
  disabledButton: false,
  height: 100,
  onClose: jest.fn(),
  onPress: jest.fn(),
  children: <div>children</div>,
});

describe('components/organisms/Modal/Modal.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Modal {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
