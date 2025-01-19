import dayjs from "@/lib/dayjs";
import type { ItemQuery } from "queries/api/index";
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

type HomeDate = {
  date: string;
};

const initialHomeDateState = (): HomeDate => ({
  date: dayjs().format("YYYY-MM-DDT00:00:00+09:00"),
});

export const homeDateState = atom<HomeDate>({
  key: "homeDateState",
  default: initialHomeDateState(),
});

type HomeItems = {
  items: Item[];
};

const initialHomeItemsState = (): HomeItems => ({
  items: [],
});

export const homeItemsState = atom<HomeItems>({
  key: "homeItemsState",
  default: initialHomeItemsState(),
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

type HomeState = {
  openAddItemModal: boolean;
};

const initialHomeState = (): HomeState => ({
  openAddItemModal: false,
});

export const homeState = atom<HomeState>({
  key: "homeState",
  default: initialHomeState(),
});

type Screen = {
  seeYouAgain: boolean;
};

const initialScreenState = (): Screen => ({
  seeYouAgain: false,
});

export const screenState = atom<Screen>({
  key: "screenState",
  default: initialScreenState(),
});
