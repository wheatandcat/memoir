import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  data: memoirNotificationSetting(),
  onSaveNotification: jest.fn(),
  onStep: jest.fn(),
  step: 0,
});

describe('components/pages/Intro/Intro/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
