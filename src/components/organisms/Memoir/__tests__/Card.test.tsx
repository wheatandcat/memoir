import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Card, { Props } from '../Card';

const propsData = (): Props => ({
  title: 'title',
  categoryID: 1,
  user: {
    id: 'test',
    displayName: 'suzuki',
    image: '',
  },
  onPress: jest.fn(),
});

describe('components/organisms/Memoir/Card.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Card {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
