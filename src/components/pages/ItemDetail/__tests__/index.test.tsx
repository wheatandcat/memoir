import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ItemDetail, { Props } from '../';

const propsHomeData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        date: '2020-01-01',
        id: 'test',
      },
    },
  } as any);

describe('components/pages/ItemDetail/index.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ItemDetail {...propsHomeData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
