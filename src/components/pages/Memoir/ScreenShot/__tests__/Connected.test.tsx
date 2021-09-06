import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Recoil from 'recoil';
import { user } from '__mockData__/user';
import * as queries from 'queries/api/index';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  selectedUserIDList: ['1'],
});

describe('components/pages/Memoir/ScreenShot/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      ...user(),
    }));
    jest
      .spyOn(queries, 'useItemsInPeriodQuery')
      .mockImplementation((): any => ({
        loading: false,
        data: null,
        error: undefined,
      }));
    jest
      .spyOn(queries, 'useRelationshipsQuery')
      .mockImplementation((): any => ({
        loading: false,
        data: null,
        error: undefined,
      }));

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
