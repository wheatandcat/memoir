export type ConnectedType = {
  userID: string;
  loading: boolean;
  send: boolean;
  text: string;
  onContact: (text: string) => void;
  onChangeText: (text: string) => void;
  onClose: () => void;
};
