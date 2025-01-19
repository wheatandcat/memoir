import type { RelationshipsQuery } from "queries/api/index";
import { user } from "./user";

export type Relationship = NonNullable<
  EdgesNode<RelationshipsQuery["relationships"]>
>;

export const relationship = (option?: Partial<Relationship>): Relationship => ({
  id: "1",
  followedId: "test",
  followerId: "test",
  user: user(),
  createdAt: "2021-01-01T00:00:00+09:00",
  updatedAt: "2021-01-01T00:00:00+09:00",
  ...option,
});

export const relationships = (): Relationship[] => [
  relationship(),
  relationship({
    id: "2",
    user: user(),
  }),
  relationship({
    id: "3",
    user: user(),
  }),
  relationship({
    id: "4",
    user: user(),
  }),
];
