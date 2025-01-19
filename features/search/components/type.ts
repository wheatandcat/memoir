import type { Props as InputDateProps } from "@/components/layouts/Search/Input/InputDate";
import type { User as TUser } from "queries/api/index";

export type User = Pick<TUser, "id" | "image">;

export type Input = {
  startDate: InputDateProps["startDate"];
  endDate: InputDateProps["endDate"];
  userIDList: string[];
  categoryID: number;
  like: boolean;
  dislike: boolean;
};

export type ConnectedType = {
  users: User[];
  onSearch: (input: Input) => void;
};
