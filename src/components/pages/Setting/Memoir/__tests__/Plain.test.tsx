import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  onSave: jest.fn(),
  data: memoirNotificationSetting(),
});

describe('components/pages/Setting/Memoir/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
