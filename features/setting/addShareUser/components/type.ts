import type {
  CreateRelationshipRequestMutation,
  InviteQuery,
} from "@/queries/api/index";
import type { User } from "@/store/userStore";

export type ConnectedType = {
  user: User;
  requestUser:
    | CreateRelationshipRequestMutation["createRelationshipRequest"]["user"]
    | null;
  onCreateInvite: () => void;
  onUpdateInvite: () => void;
  onSearchInviteCode: (code: string) => void;
  onCreateRelationshipRequest: (code: string) => void;
  creating: boolean;
  updating: boolean;
  loading: boolean;
  requesting: boolean;
  confirmUser: {
    id: string;
    displayName: string;
    image: string;
  } | null;
};

export type Invite = InviteQuery["invite"];
