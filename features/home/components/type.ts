import type { NewItem } from "@/queries/api/index";
import type { Item } from "@/store/homeItemsStore";

export type ConnectedType = {
  items: Item[];
  loading: boolean;
  addItemLoading: boolean;
  date: string;
  openAddItemModal: boolean;
  openSettingModal: boolean;
  onAddItem: (item: NewItem) => void;
  onChangeDate: (date: string) => void;
  onCloseAddItem: () => void;
  onCloseSettingModal: () => void;
  onItem: (itemID: string) => void;
  onMemoir: () => void;
  onOpenAddItem: () => void;
};
