import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { item } from '__mockData__/item';
import CardDetail, { Props } from '../CardDetail';

const propsData = (): Props => ({
  title: item().title,
  date: item().date,
  categoryID: item().categoryID,
  like: item().like,
  dislike: item().dislike,
  onOpenUpdateItem: jest.fn(),
  onDeleteItem: jest.fn(),
});

describe('components/organisms/CardDetail/CardDetail.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<CardDetail {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
