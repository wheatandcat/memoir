import { getItem, storageKey } from "@/lib/storage";
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
  loading: boolean;
  user: User;
  uid: string | null;
  initializeUser: () => Promise<void>;
  setUser: (user: User) => void;
  reset: () => void;
}>((set) => ({
  loading: true,
  user: initialUserState(),
  uid: null,
  initializeUser: async () => {
    set({ loading: true });
    const uid = await getItem(storageKey.USER_ID_KEY);
    if (uid) {
      set({ uid: uid });
    }
    set({ loading: false });
  },
  setUser: (user) => set({ user }),
  reset: () => set({ user: initialUserState() }),
}));
