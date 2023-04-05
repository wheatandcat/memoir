import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { relationshipRequest } from '__mockData__/relationshipRequest';
import * as client from '@apollo/client';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  onCallback: jest.fn(),
});

describe('components/pages/Setting/RelationshipRequests/Connected.tsx', () => {
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
    testRenderer(<Connected {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
