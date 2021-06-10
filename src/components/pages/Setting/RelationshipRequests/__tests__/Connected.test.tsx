import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as queries from 'queries/api/index';
import { relationshipRequest } from '__mockData__/relationshipRequest';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/Setting/RelationshipRequests/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(queries, 'useRelationshipRequestsQuery')
      .mockImplementation((): any => ({
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

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
