import type { UseFirebaseAuth } from "@/hooks/useFirebaseAuth";
import type { RelationshipsQuery } from "queries/api/index";

export type Relationship = NonNullable<
  EdgesNode<RelationshipsQuery["relationships"]>
>;

export type ConnectedType = {
  deleting: boolean;
  relationshipRequestCount: number;
  relationships: Relationship[];
  onRelationshipRequests: () => void;
  onUpdateProfile: () => void;
  onLogin: () => void;
  onLogout: UseFirebaseAuth["onLogout"];
  onAddShareUser: () => void;
  onDeleteRelationship: (followedId: string) => void;
};
