import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  error: undefined,
  data: {
    itemsInPeriod: {
      pageInfo: {
        endCursor: '',
        hasNextPage: false,
      },
      edges: [],
    },
  },
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  users: [],
});

describe('components/pages/Memoir/ScreenShot/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
