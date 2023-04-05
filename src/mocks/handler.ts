import { graphql } from 'msw';
import {
  ItemDocument,
  UpdateItemDocument,
  DeleteItemDocument,
  ItemsByDateDocument,
  ItemsInPeriodDocument,
  RelationshipsDocument,
} from 'queries/api/index';
import {
  aPageInfo,
  anItem,
  anItemsInPeriodEdge,
  aRelationshipEdge,
} from 'queries/api/mocks';

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
  graphql.query(ItemsByDateDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        itemsByDate: [{ ...anItem(), categoryID: 1 }],
      })
    );
  }),
  graphql.query(ItemsInPeriodDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        itemsInPeriod: {
          pageInfo: aPageInfo(),
          edges: [anItemsInPeriodEdge()],
        },
      })
    );
  }),
  graphql.query(RelationshipsDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        relationships: {
          pageInfo: aPageInfo(),
          edges: [aRelationshipEdge()],
        },
      })
    );
  }),
];
