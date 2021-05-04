import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { items } from '__mockData__/item';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  items: items(),
  loading: false,
  error: undefined,
  addItemLoading: false,
  date: '2020-01-01',
  openAddItemModal: false,
  openSettingModal: false,
  onAddItem: jest.fn(),
  onChangeDate: jest.fn(),
  onCloseAddItem: jest.fn(),
  onCloseSettingModal: jest.fn(),
  onItem: jest.fn(),
  onMemoir: jest.fn(),
  onOpenAddItem: jest.fn(),
});

describe('components/pages/Home/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
