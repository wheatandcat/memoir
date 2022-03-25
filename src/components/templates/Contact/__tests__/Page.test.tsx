import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  userID: 'abc',
  loading: false,
  onContact: jest.fn(),
});

describe('components/templates/Contact/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
