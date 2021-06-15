import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { relationshipRequest } from '__mockData__/relationshipRequest';
import Card, { Props } from '../Card';

const propsData = (): Props => ({
  ...relationshipRequest(),
  onOK: jest.fn(),
  onNG: jest.fn(),
  ngRequesting: false,
  acceptRequesting: false,
});

describe('components/organisms/RelationshipRequest/Card.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Card {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
