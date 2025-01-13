export type User = {
  id: string;
  displayName: string;
  image: string;
};

export type ConnectedType = {
  startDate: string;
  endDate: string;
  users: User[];
  selectedUserIDList: string[];
  isFilter: boolean;
  search: boolean;
  onScreenShot: () => void;
  onLoadMore: (after: string | null) => void;
  onChangeUserID: (userIDList: string[]) => void;
};
