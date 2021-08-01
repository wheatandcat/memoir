import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Notification, { Props } from '../Notification';

const propsData = (): Props => ({
  ...memoirNotificationSetting(),
  onSaveNotification: jest.fn(),
  onNext: jest.fn(),
});

describe('components/organisms/Intro/Notification.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Notification {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
