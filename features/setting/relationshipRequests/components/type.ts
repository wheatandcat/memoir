export type ConnectedType = {
  acceptRequesting: boolean;
  ngRequesting: boolean;
  onLoadMore: (after: string | null) => void;
  onOK: (followedId: string) => void;
  onNG: (followedId: string) => void;
};
