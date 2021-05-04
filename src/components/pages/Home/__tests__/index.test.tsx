import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Home, Props } from '../';

const propsHomeData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {},
    },
  } as any);

describe('components/pages/Home/index.tsx', () => {
  let wrapper: ShallowWrapper;

  describe('Home', () => {
    beforeEach(() => {
      wrapper = shallow(<Home {...propsHomeData()} />);
    });

    it('正常にrenderすること', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
