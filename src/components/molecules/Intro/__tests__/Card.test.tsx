import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Card, { Props } from '../Card';

const propsData = (): Props => ({
  source: require('../../../img/common/intro_01.png'),
  text: '記録する\nふりかえる\n共有する',
  onNext: jest.fn(),
});

describe('components/molecules/Intro/Card.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Card {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
