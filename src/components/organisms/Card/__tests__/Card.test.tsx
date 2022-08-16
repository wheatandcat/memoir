import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { item } from '__mockData__/item';
import { user } from '__mockData__/user';
import Card, { Props } from '../';

const propsData = (): Props => ({
  title: item().title,
  categoryID: item().categoryID,
  user: {
    id: user().id,
    name: 'name',
  },
  onPress: jest.fn(),
});

describe('components/organisms/Card/Card.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Card {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
