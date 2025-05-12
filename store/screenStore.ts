import { create } from "zustand";

type Screen = {
  seeYouAgain: boolean;
};

const initialScreenState = (): Screen => ({
  seeYouAgain: false,
});

export const useScreenStore = create<{
  screen: Screen;
  setSeeYouAgain: (see: boolean) => void;
  reset: () => void;
}>((set) => ({
  screen: initialScreenState(),
  setSeeYouAgain: (see) =>
    set((state) => ({ screen: { ...state.screen, seeYouAgain: see } })),
  reset: () => set({ screen: initialScreenState() }),
}));
