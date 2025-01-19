import type { User as TUser } from "@/store/atoms";

type Props = {
  startDate: string;
  endDate: string;
  selectedUserIDList?: string[];
  categoryID: number;
  like: boolean;
  dislike: boolean;
};

export type ConnectedType = Omit<
  Props,
  "selectedUserIDList" | "categoryID" | "like" | "dislike"
> & {
  users: User[];
};

export type User = Omit<TUser, "userID"> & {
  id: string;
};
