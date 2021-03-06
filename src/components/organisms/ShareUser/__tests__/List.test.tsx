import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { relationships } from '__mockData__/relationship';
import List, { Props } from '../List';

const propsData = (): Props => ({
  onAdd: jest.fn(),
  deleting: false,
  onDeleteRelationship: jest.fn(),
  relationships: relationships(),
});

describe('components/organisms/ShareUser/List.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<List {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
