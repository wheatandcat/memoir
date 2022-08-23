import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { relationshipRequest } from '__mockData__/relationshipRequest';
import * as client from '@apollo/client';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  onCallback: jest.fn(),
});

describe('components/pages/Setting/RelationshipRequests/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest.spyOn(client, 'useQuery').mockImplementation((): any => ({
      loading: false,
      error: undefined,
      data: {
        relationshipRequests: {
          pageInfo: {
            hasNextPage: false,
            endCursor: '',
          },
          edges: [
            {
              node: {
                ...relationshipRequest(),
              },
              cursor: '',
            },
          ],
        },
      },
    }));
    jest.spyOn(client, 'useMutation').mockImplementation((): any => [
      jest.fn(),
      {
        loading: false,
        error: undefined,
      },
    ]);
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
