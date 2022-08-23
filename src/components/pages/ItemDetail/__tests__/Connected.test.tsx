import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Recoil from 'recoil';
import { item } from '__mockData__/item';
import * as useHomeItems from 'hooks/useHomeItems';
import * as client from '@apollo/client';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  itemID: 'test',
  date: '2020-01-01',
});

describe('components/pages/ItemDetail/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(Recoil, 'useSetRecoilState')
      .mockImplementation((): any => jest.fn());
    jest.spyOn(useHomeItems, 'default').mockImplementation((): any => ({
      loading: false,
      error: null,
      refetch: jest.fn(),
    }));
    jest.spyOn(client, 'useQuery').mockImplementation((): any => ({
      loading: false,
      data: {
        item: item(),
      },
      error: undefined,
      refetch: jest.fn(),
    }));
    jest.spyOn(client, 'useMutation').mockImplementation((): any => [
      jest.fn(),
      {
        loading: false,
      },
    ]);
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
