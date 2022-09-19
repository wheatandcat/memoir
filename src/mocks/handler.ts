import { graphql } from 'msw';
import {
  ItemDocument,
  UpdateItemDocument,
  DeleteItemDocument,
} from 'queries/api/index';
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
  graphql.mutation(UpdateItemDocument, (req, res, ctx) => {
    return res(
      ctx.data({
        updateItem: {
          id: req.variables.input.id,
          date: req.variables.input.date,
        },
      })
    );
  }),
  graphql.mutation(DeleteItemDocument, (req, res, ctx) => {
    return res(
      ctx.data({
        deleteItem: {
          id: req.variables.input.id,
        },
      })
    );
  }),
];
