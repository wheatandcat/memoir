import { graphql } from 'msw';
import { ItemDocument } from 'queries/api/index';
import { anItem } from 'queries/api/mocks';

export const handlers = [
  graphql.query(ItemDocument, (req, res, ctx) => {
    return res(
      ctx.data({
        item: {
          ...anItem(),
          id: req.variables.id,
        },
      })
    );
  }),
];
