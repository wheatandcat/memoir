import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Notification, { Props } from '../Notification';

const propsData = (): Props => ({
  count: 3,
  onPress: jest.fn(),
});

describe('components/organisms/RelationshipRequest/Notification.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Notification {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
