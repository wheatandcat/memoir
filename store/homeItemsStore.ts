import type { ItemQuery } from "@/queries/api/index";
import { create } from "zustand";

export type Item = NonNullable<ItemQuery["item"]>;

type HomeItems = {
  items: Item[];
};

const initialHomeItemsState = (): HomeItems => ({
  items: [],
});

export const useHomeItemsStore = create<{
  homeItems: HomeItems;
  setHomeItems: (items: Item[]) => void;
  reset: () => void;
}>((set) => ({
  homeItems: initialHomeItemsState(),
  setHomeItems: (items) => set({ homeItems: { items } }),
  reset: () => set({ homeItems: initialHomeItemsState() }),
}));
