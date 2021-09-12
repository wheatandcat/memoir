import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import NotFound, { Props } from '../NotFound';

const propsData = (): Props => ({ loading: false });

describe('components/molecules/RelationshipRequest/NotFound.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<NotFound {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
