import { create } from "zustand";

type HomeState = {
  openAddItemModal: boolean;
};

const initialHomeState = (): HomeState => ({
  openAddItemModal: false,
});

export const useHomeStateStore = create<{
  homeState: HomeState;
  setOpenAddItemModal: (open: boolean) => void;
  reset: () => void;
}>((set) => ({
  homeState: initialHomeState(),
  setOpenAddItemModal: (open) =>
    set((state) => ({
      homeState: { ...state.homeState, openAddItemModal: open },
    })),
  reset: () => set({ homeState: initialHomeState() }),
}));
