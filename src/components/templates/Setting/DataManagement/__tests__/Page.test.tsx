import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  loading: false,
  disabledDeleteButton: false,
  onDelete: jest.fn(),
});

describe('components/templates/DataManagement/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
