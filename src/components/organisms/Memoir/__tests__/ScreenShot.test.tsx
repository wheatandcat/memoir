import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { items } from '__mockData__/item';
import ScreenShot, { Props } from '../ScreenShot';

const propsData = (): Props => ({
  items: items().map((v) => ({ ...v, userID: 'test' })),
  loading: false,
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  users: [
    {
      id: 'test',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
});

describe('components/organisms/Memoir/ScreenShot.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ScreenShot {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
