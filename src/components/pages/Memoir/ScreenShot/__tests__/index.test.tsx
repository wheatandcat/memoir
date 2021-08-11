import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import IndexPage, { Props } from '../';

const propsData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        startDate: '2020-01-01',
        endDate: '2020-01-07',
      },
    },
  } as any);

describe('components/pages/Memoir/ScreenShot/index.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<IndexPage {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
