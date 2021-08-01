import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  ...memoirNotificationSetting(),
  onSaveNotification: jest.fn(),
  onFinish: jest.fn(),
});

describe('components/templates/Intro/Intro/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
