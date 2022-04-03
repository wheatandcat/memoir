import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { users } from '__mockData__/user';
import Page, { Props } from '../Page';
import mockdate from 'mockdate';

const propsData = (): Props => ({
  users: users(),
  onSearch: jest.fn(),
});

describe('components/templates/Search/Page.tsx', () => {
  mockdate.set('2020-01-01 00:00:00');
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
