import dayjs from "@/lib/dayjs";
import { create } from "zustand";

type HomeDate = {
  date: string;
};

const initialHomeDateState = (): HomeDate => ({
  date: dayjs().format("YYYY-MM-DDT00:00:00+09:00"),
});

export const useHomeDateStore = create<{
  homeDate: HomeDate;
  setHomeDate: (date: string) => void;
  reset: () => void;
}>((set) => ({
  homeDate: initialHomeDateState(),
  setHomeDate: (date) => set({ homeDate: { date } }),
  reset: () => set({ homeDate: initialHomeDateState() }),
}));
