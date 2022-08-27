import React from 'react';
import { graphql } from 'msw';
import { ItemDocument } from 'queries/api/index';
import { item } from '__mockData__/item';
import * as Recoil from 'recoil';
import * as useHomeItems from 'hooks/useHomeItems';
import * as client from '@apollo/client';
import { testRenderer } from 'lib/testUtil';
import { screen, waitFor } from '@testing-library/react-native';
import Connected, { Props } from '../Connected';

const propsData = (props?: Partial<Props>): Props => ({
  itemID: 'test',
  date: '2020-01-01',
  ...props,
});

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
    jest.spyOn(client, 'useMutation').mockImplementation((): any => [
      jest.fn(),
      {
        loading: false,
      },
    ]);
  });

  it('正常にrenderすること', async () => {
    const renderPage = testRenderer(<Connected {...propsData()} />);
    renderPage();

    await waitFor(() => {
      expect(screen.getAllByText('買い物')).toBeTruthy();
    });
  });

  it('LIKEが表示されている', async () => {
    const renderPage = testRenderer(
      <Connected
        {...propsData({
          itemID: 'test2',
        })}
      />
    );

    const queryInterceptor = jest.fn();

    renderPage(
      graphql.query(ItemDocument, (req, res, ctx) => {
        queryInterceptor(req.variables);

        return res(
          ctx.data({
            item: {
              ...item(),
              id: req.variables.id,
              title: '宝くじが当たった',
              like: true,
            },
          })
        );
      })
    );

    await waitFor(async () => {
      expect(queryInterceptor).toHaveBeenCalledTimes(1);
      expect(screen.getByText('宝くじが当たった')).toBeTruthy();
      expect(screen.getByTestId('like')).toBeTruthy();
    });
  });
});
