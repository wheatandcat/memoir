import { atom } from 'recoil';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { ItemQuery } from 'queries/api/index';

export type Item = NonNullable<ItemQuery['item']>;

dayjs.locale('ja');
dayjs.extend(advancedFormat);

export type User = {
  id: string | null;
};

const initialUserState = (): User => ({
  id: null,
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
