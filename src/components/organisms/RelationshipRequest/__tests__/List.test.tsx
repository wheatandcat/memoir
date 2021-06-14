import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { mockFn } from 'storyBookUtils/index';
import { relationshipRequests } from '__mockData__/relationshipRequest';
import List, { Props } from '../List';

const propsData = (): Props => ({
  items: relationshipRequests(),
  pageInfo: {
    hasNextPage: false,
    endCursor: '',
  },
  onLoadMore: mockFn('onLoadMore'),
  loading: false,
  onOK: jest.fn(),
  onNG: jest.fn(),
  ngRequesting: false,
  acceptRequesting: false,
});

describe('components/organisms/RelationshipRequest/List.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<List {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
