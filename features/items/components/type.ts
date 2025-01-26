import type { NewItem } from "@/queries/api/index";

export type ConnectedType = {
  updateItemLoading: boolean;
  date: string;
  openUpdateItemModal: boolean;
  onOpenUpdateItem: () => void;
  onChangeDate: (date: string) => void;
  onUpdateItem: (updateItem: NewItem) => void;
  onDeleteItem: () => void;
  onCloseUpdateItem: () => void;
};
