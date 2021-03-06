import { atom } from 'recoil';

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
