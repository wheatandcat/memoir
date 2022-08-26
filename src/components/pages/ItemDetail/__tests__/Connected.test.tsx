import React from 'react';
import { graphql } from 'msw';
import { ItemDocument } from 'queries/api/index';
import { item } from '__mockData__/item';
import * as Recoil from 'recoil';
import * as useHomeItems from 'hooks/useHomeItems';
import * as client from '@apollo/client';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  itemID: 'test',
  date: '2020-01-01',
});

describe('components/pages/ItemDetail/Connected.tsx', () => {
  beforeEach(() => {
    jest
      .spyOn(Recoil, 'useSetRecoilState')
      .mockImplementation((): any => jest.fn());
    jest.spyOn(useHomeItems, 'default').mockImplementation((): any => ({
      loading: false,
      error: null,
      refetch: jest.fn(),
    }));
    /*
    jest.spyOn(client, 'useQuery').mockImplementation((): any => ({
      loading: false,
      data: {
        item: item(),
      },
      error: undefined,
      refetch: jest.fn(),
    }));
    */
    jest.spyOn(client, 'useMutation').mockImplementation((): any => [
      jest.fn(),
      {
        loading: false,
      },
    ]);
  });

  const renderPage = testRenderer(<Connected {...propsData()} />);

  it('正常にrenderすること', async () => {
    renderPage(
      graphql.query(ItemDocument, (req, res, ctx) => {
        return res(
          ctx.data({
            item: {
              ...item(),
              id: req.variables.id,
              title: '買い物',
              like: true,
            },
          })
        );
      })
    );
    screen.debug();
    //expect(screen.getAllByText('買い物')).toBeTruthy();
  });
});
