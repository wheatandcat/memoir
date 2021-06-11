import { RelationshipRequestsQuery } from 'queries/api/index';
import { user } from './user';

export type RelationshipRequest = NonNullable<
  EdgesNode<RelationshipRequestsQuery['relationshipRequests']>
>;

export const relationshipRequest = (
  option?: Partial<RelationshipRequest>
): RelationshipRequest => ({
  id: '1',
  followedId: 'test',
  followerId: 'test',
  user: user(),
  createdAt: '2021-01-01T00:00:00+09:00',
  updatedAt: '2021-01-01T00:00:00+09:00',
  ...option,
});

export const relationshipRequests = (): RelationshipRequest[] => [
  relationshipRequest(),
  relationshipRequest({
    id: '2',
    user: user(),
  }),
  relationshipRequest({
    id: '3',
    user: user(),
  }),
  relationshipRequest({
    id: '4',
    user: user(),
  }),
];
