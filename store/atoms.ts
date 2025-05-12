import type { ItemQuery } from "@/queries/api/index";
import { atom } from "recoil";

export type Item = NonNullable<ItemQuery["item"]>;

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
