import { atom } from 'recoil';
import dayjs from 'lib/dayjs';
import { ItemQuery } from 'queries/api/index';

export type Item = NonNullable<ItemQuery['item']>;

export type User = {
  id: string | null;
  userID: string;
  displayName: string;
  image: string;
};

const initialUserState = (): User => ({
  id: null,
  userID: '',
  displayName: '',
  image: '',
});

export const userState = atom<User>({
  key: 'userState',
  default: initialUserState(),
});

export type HomeDate = {
  date: string;
};

const initialHomeDateState = (): HomeDate => ({
  date: dayjs().format('YYYY-MM-DDT00:00:00+09:00'),
});

export const homeDateState = atom<HomeDate>({
  key: 'homeDateState',
  default: initialHomeDateState(),
});

export type HomeItems = {
  items: Item[];
};

const initialHomeItemsState = (): HomeItems => ({
  items: [],
});

export const homeItemsState = atom<HomeItems>({
  key: 'homeItemsState',
  default: initialHomeItemsState(),
});

export type AuthUser = {
  uid: string | null;
};

const initialAuthUserState = (): AuthUser => ({
  uid: null,
});

export const authUserState = atom<AuthUser>({
  key: 'authUserState',
  default: initialAuthUserState(),
});
