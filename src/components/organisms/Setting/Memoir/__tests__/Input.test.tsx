import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Input, { Props } from '../Input';

const propsData = (): Props => ({
  dayOfWeek: 0,
  time: new Date('0000-01-01T00:00:00'),
  onChangeDayOfWeek: jest.fn(),
  onChangeTime: jest.fn(),
});

describe('components/organisms/Setting/Memoir/Input.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Input {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
