import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Recoil from 'recoil';
import { user } from '__mockData__/user';
import { relationships } from '__mockData__/relationship';
import * as client from '@apollo/client';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/Search/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
    ...user(),
  }));
  jest.spyOn(client, 'useQuery').mockImplementation((): any => ({
    loading: false,
    data: {
      relationships: {
        edges: relationships(),
      },
    },
    error: undefined,
    refetch: jest.fn(),
  }));

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
