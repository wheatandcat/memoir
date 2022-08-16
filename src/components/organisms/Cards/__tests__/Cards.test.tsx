import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { items } from '__mockData__/item';
import Cards, { Props } from '../Cards';

const propsData = (): Props => ({
  date: '2020-01-01',
  addItemLoading: false,
  loading: false,
  items: items(),
  onItem: jest.fn(),
  onAddItem: jest.fn(),
});

describe('components/organisms/Cards/Cards.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Cards {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
