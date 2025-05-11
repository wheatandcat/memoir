import type { ItemQuery } from "@/queries/api/index";
import { atom } from "recoil";

export type Item = NonNullable<ItemQuery["item"]>;

export type User = {
  id: string | null;
  userID: string;
  displayName: string;
  image: string;
};

const initialUserState = (): User => ({
  id: null,
  userID: "",
  displayName: "",
  image: "",
});

export const userState = atom<User>({
  key: "userState",
  default: initialUserState(),
});

type AuthUser = {
  uid: string | null;
};

const initialAuthUserState = (): AuthUser => ({
  uid: null,
});

export const authUserState = atom<AuthUser>({
  key: "authUserState",
  default: initialAuthUserState(),
});
