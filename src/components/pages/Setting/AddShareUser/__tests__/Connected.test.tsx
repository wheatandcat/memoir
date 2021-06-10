import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Recoil from 'recoil';
import * as queries from 'queries/api/index';
import { invite } from '__mockData__/Invite';
import { user } from '__mockData__/user';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/Setting/AddShareUser/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      id: 'test-id',
      displayName: 'test-name',
    }));
    jest
      .spyOn(queries, 'useCreateInviteMutation')
      .mockImplementation((): any => [jest.fn(), { loading: false }]);
    jest
      .spyOn(queries, 'useUpdateInviteMutation')
      .mockImplementation((): any => [jest.fn(), { loading: false }]);
    jest.spyOn(queries, 'useInviteQuery').mockImplementation((): any => ({
      loading: false,
      error: undefined,
      data: {
        invite: invite(),
      },
    }));
    jest
      .spyOn(queries, 'useCreateRelationshipRequestMutation')
      .mockImplementation((): any => [
        jest.fn(),
        {
          loading: false,
          data: {
            createRelationshipRequest: {
              user: user(),
            },
          },
        },
      ]);

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
