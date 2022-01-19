import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Dialog, { Props } from '../Dialog';

const propsData = (): Props => ({
  users: [
    {
      id: 'test',
      displayName: 'suzuki',
      image: '',
    },
  ],
});

describe('components/organisms/Search/Dialog.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Dialog {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
