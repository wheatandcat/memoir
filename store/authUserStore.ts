import { getItem, storageKey } from "@/lib/storage";
import { create } from "zustand";

type AuthUser = {
  uid: string | null;
};

const initialAuthUserState = (): AuthUser => ({
  uid: null,
});

export const useAuthUserStore = create<{
  loading: boolean;
  authUser: AuthUser;
  initializeAuthUser: () => Promise<void>;
  setAuthUser: (uid: string | null) => void;
  reset: () => void;
}>((set) => ({
  loading: true,
  authUser: initialAuthUserState(),
  initializeAuthUser: async () => {
    set({ loading: true });
    const uid = await getItem(storageKey.AUTH_UID_KEY);
    if (uid) {
      set({ authUser: { uid } });
    }
    set({ loading: false });
  },
  setAuthUser: (uid) => set({ authUser: { uid } }),
  reset: () => set({ authUser: initialAuthUserState() }),
}));
