import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { item } from '__mockData__/item';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  data: {
    item: item(),
  },
  loading: false,
  error: undefined,
  updateItemLoading: false,
  date: '2020-01-01',
  openUpdateItemModal: false,
  onChangeDate: jest.fn(),
  onOpenUpdateItem: jest.fn(),
  onUpdateItem: jest.fn(),
  onDeleteItem: jest.fn(),
  onCloseUpdateItem: jest.fn(),
});

describe('components/pages/ItemDetail/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
