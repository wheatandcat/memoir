import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import InputDate, { Props } from '../InputDate';

const propsData = (): Props => ({
  startDate: new Date('2021-01-01T00:00:00+09:00'),
  endDate: new Date('2021-01-18T00:00:00+09:00'),
  onChangeStartDate: jest.fn(),
  onChangeEndDate: jest.fn(),
});

describe('components/organisms/Search/Input/InputDate.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<InputDate {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
