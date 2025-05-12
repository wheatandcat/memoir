import { create } from "zustand";

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

export const useUserStore = create<{
  user: User;
  setUser: (user: User) => void;
  reset: () => void;
}>((set) => ({
  user: initialUserState(),
  setUser: (user) => set({ user }),
  reset: () => set({ user: initialUserState() }),
}));
