import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { user } from '__mockData__/user';
import { relationships } from '__mockData__/relationship';
import Authenticated, { Props } from '../Authenticated';

const propsData = (): Props => ({
  user: {
    ...user(),
    userID: '',
  },
  relationships: relationships(),
  relationshipRequestCount: 3,
  onUpdateProfile: jest.fn(),
  onLogout: jest.fn(),
  onAddShareUser: jest.fn(),
  onRelationshipRequests: jest.fn(),
  deleting: false,
  onDeleteRelationship: jest.fn(),
});

describe('components/organisms/MyPage/Authenticated.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Authenticated {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
