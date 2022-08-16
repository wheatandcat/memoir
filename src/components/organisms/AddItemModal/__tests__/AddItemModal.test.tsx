import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { item } from '__mockData__/item';
import AddItemModal, { Props } from '../';

const propsData = (): Props => ({
  item: {
    categoryID: item().categoryID,
    date: item().date,
    dislike: item().dislike,
    like: item().like,
    title: item().title,
  },
  isVisible: true,
  loading: false,
  date: '2020-01-01',
  onAdd: jest.fn(),
  onClose: jest.fn(),
});

describe('components/organisms/AddItemModal/AddItemModal.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<AddItemModal {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
