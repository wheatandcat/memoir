import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Notification, { Props } from '../Notification';

const propsData = (): Props => ({
  push: 0,
  setPush: jest.fn(),
});

describe('components/organisms/Setting/Memoir/Notification.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Notification {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
