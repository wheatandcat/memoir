import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { relationshipRequests } from '__mockData__/relationshipRequest';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  items: relationshipRequests(),
  pageInfo: { hasNextPage: false, endCursor: '' },
  loading: false,
  onLoadMore: jest.fn(),
  onOK: jest.fn(),
  onNG: jest.fn(),
  ngRequesting: false,
  acceptRequesting: false,
});

describe('components/templates/Setting/RelationshipRequests/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
