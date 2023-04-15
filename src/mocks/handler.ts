import { graphql } from 'msw';
import {
  ItemDocument,
  UpdateItemDocument,
  DeleteItemDocument,
  ItemsByDateDocument,
  ItemsInPeriodDocument,
  RelationshipsDocument,
  InviteDocument,
  InviteByCodeDocument,
  UpdateInviteDocument,
  CreateInviteDocument,
  CreateRelationshipRequestDocument,
  DeleteUserDocument,
  RelationshipRequestsDocument,
  AcceptRelationshipRequestDocument,
  NgRelationshipRequestDocument,
  UpdateUserDocument,
} from 'queries/api/index';
import {
  aPageInfo,
  anItem,
  anItemsInPeriodEdge,
  aRelationshipEdge,
  anInvite,
  aUser,
  aRelationshipRequest,
  aRelationshipRequestEdge,
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
  graphql.query(InviteDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        invite: anInvite(),
      })
    );
  }),
  graphql.query(InviteByCodeDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        inviteByCode: aUser(),
      })
    );
  }),
  graphql.mutation(UpdateInviteDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        updateInvite: anInvite(),
      })
    );
  }),
  graphql.mutation(CreateInviteDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        createInvite: anInvite(),
      })
    );
  }),
  graphql.mutation(CreateRelationshipRequestDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        createRelationshipRequest: aRelationshipRequest(),
      })
    );
  }),
  graphql.mutation(DeleteUserDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        deleteUser: aUser(),
      })
    );
  }),
  graphql.query(RelationshipRequestsDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        relationshipRequests: {
          pageInfo: aPageInfo(),
          edges: [aRelationshipRequestEdge()],
        },
      })
    );
  }),
  graphql.mutation(AcceptRelationshipRequestDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        acceptRelationshipRequest: aRelationshipRequest(),
      })
    );
  }),
  graphql.mutation(NgRelationshipRequestDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        ngRelationshipRequest: aRelationshipRequest(),
      })
    );
  }),
  graphql.mutation(UpdateUserDocument, (_, res, ctx) => {
    return res(
      ctx.data({
        updateUser: aUser(),
      })
    );
  }),
];
