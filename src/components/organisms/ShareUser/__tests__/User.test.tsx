import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { user } from '__mockData__/user';
import User, { Props } from '../User';

const propsData = (): Props => ({
  user: user(),
  loading: false,
  onDeleteRelationship: jest.fn(),
});

describe('components/organisms/ShareUser/User.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<User {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
