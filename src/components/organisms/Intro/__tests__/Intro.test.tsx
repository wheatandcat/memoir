import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Intro, { Props } from '../Intro';

const propsData = (): Props => ({
  ...memoirNotificationSetting(),
  onSaveNotification: jest.fn(),
  onFinish: jest.fn(),
});

describe('components/organisms/Intro/Intro.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Intro {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
