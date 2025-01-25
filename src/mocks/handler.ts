import { HttpResponse, graphql } from "msw";
import {
  AcceptRelationshipRequestDocument,
  CreateInviteDocument,
  CreateRelationshipRequestDocument,
  DeleteItemDocument,
  DeleteUserDocument,
  InviteByCodeDocument,
  InviteDocument,
  ItemDocument,
  ItemsByDateDocument,
  ItemsInPeriodDocument,
  NgRelationshipRequestDocument,
  RelationshipRequestsDocument,
  RelationshipsDocument,
  UpdateInviteDocument,
  UpdateItemDocument,
  UpdateUserDocument,
} from "queries/api/index";
import {
  aPageInfo,
  aRelationshipEdge,
  aRelationshipRequest,
  aRelationshipRequestEdge,
  aUser,
  anInvite,
  anItem,
  anItemsInPeriodEdge,
} from "queries/api/mocks";

export const handlers = [
  graphql.query(ItemDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        item: {
          ...anItem(),
          id: variables.id,
        },
      },
    });
  }),
  graphql.mutation(UpdateItemDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        updateItem: {
          id: variables.input.id,
          date: variables.input.date,
        },
      },
    });
  }),
  graphql.mutation(DeleteItemDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        deleteItem: {
          id: variables.input.id,
        },
      },
    });
  }),
  graphql.query(ItemsByDateDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        itemsByDate: [{ ...anItem(), categoryID: 1 }],
      },
    });
  }),
  graphql.query(ItemsInPeriodDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        itemsInPeriod: {
          pageInfo: aPageInfo(),
          edges: [anItemsInPeriodEdge()],
        },
      },
    });
  }),
  graphql.query(RelationshipsDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        relationships: {
          pageInfo: aPageInfo(),
          edges: [aRelationshipEdge()],
        },
      },
    });
  }),
  graphql.query(InviteDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        invite: anInvite(),
      },
    });
  }),
  graphql.query(InviteByCodeDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        inviteByCode: aUser(),
      },
    });
  }),
  graphql.mutation(UpdateInviteDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        updateInvite: anInvite(),
      },
    });
  }),
  graphql.mutation(CreateInviteDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        createInvite: anInvite(),
      },
    });
  }),
  graphql.mutation(
    CreateRelationshipRequestDocument,
    ({ query, variables }) => {
      return HttpResponse.json({
        data: {
          createRelationshipRequest: aRelationshipRequest(),
        },
      });
    },
  ),
  graphql.mutation(DeleteUserDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        deleteUser: aUser(),
      },
    });
  }),
  graphql.query(RelationshipRequestsDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        relationshipRequests: {
          pageInfo: aPageInfo(),
          edges: [aRelationshipRequestEdge()],
        },
      },
    });
  }),
  graphql.mutation(
    AcceptRelationshipRequestDocument,
    ({ query, variables }) => {
      return HttpResponse.json({
        data: {
          acceptRelationshipRequest: aRelationshipRequest(),
        },
      });
    },
  ),
  graphql.mutation(NgRelationshipRequestDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        ngRelationshipRequest: aRelationshipRequest(),
      },
    });
  }),
  graphql.mutation(UpdateUserDocument, ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        updateUser: aUser(),
      },
    });
  }),
];
