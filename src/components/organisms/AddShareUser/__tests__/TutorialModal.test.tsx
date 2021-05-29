import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import TutorialModal, { Props } from '../TutorialModal';

const propsData = (): Props => ({
  isVisible: true,
  onClose: jest.fn(),
  onPress: jest.fn(),
});

describe('components/organisms/AddShareUser/TutorialModal.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<TutorialModal {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
