import { create } from "zustand";

type AuthUser = {
  uid: string | null;
};

const initialAuthUserState = (): AuthUser => ({
  uid: null,
});

export const useAuthUserStore = create<{
  authUser: AuthUser;
  setAuthUser: (uid: string | null) => void;
  reset: () => void;
}>((set) => ({
  authUser: initialAuthUserState(),
  setAuthUser: (uid) => set({ authUser: { uid } }),
  reset: () => set({ authUser: initialAuthUserState() }),
}));
