import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Recoil from 'recoil';
import { items } from '__mockData__/item';
import * as useHomeItems from 'hooks/useHomeItems';
import * as queries from 'queries/api/index';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  openSettingModal: false,
  onCloseSettingModal: jest.fn(),
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigation: jest.fn(),
    }),
  };
});

describe('components/pages/Home/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      items: items(),
    }));
    jest.spyOn(Recoil, 'useRecoilState').mockImplementation((): any => [
      {
        date: '2020-01-01',
      },
      jest.fn(),
    ]);
    jest.spyOn(useHomeItems, 'default').mockImplementation((): any => ({
      loading: false,
      error: null,
      refetch: jest.fn(),
    }));
    jest
      .spyOn(queries, 'useCreateItemMutation')
      .mockImplementation((): any => [jest.fn(), { loading: false }]);
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
