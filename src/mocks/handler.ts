import { graphql } from 'msw';
import { ItemDocument } from 'queries/api/index';
import { item } from '__mockData__/item';

export const handlers = [
  graphql.query(ItemDocument, (req, res, ctx) => {
    return res(
      ctx.data({
        item: {
          ...item(),
          id: req.variables.id,
        },
      })
    );
  }),
];
