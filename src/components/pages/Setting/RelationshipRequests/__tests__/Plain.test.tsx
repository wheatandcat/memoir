import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { relationshipRequests } from '__mockData__/relationshipRequest';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  items: relationshipRequests(),
  pageInfo: { hasNextPage: false, endCursor: '' },
  loading: false,
  error: undefined,
  onLoadMore: jest.fn(),
  onOK: jest.fn(),
  onNG: jest.fn(),
  ngRequesting: false,
  acceptRequesting: false,
});

describe('components/pages/Setting/RelationshipRequests/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
