import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  authenticated: true,
  loading: false,
  user: {
    id: 'test-id',
    userID: '',
    displayName: 'test-name',
    image: '',
  },
  onSave: jest.fn(),
});

describe('components/templates/UpdateProfile/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
