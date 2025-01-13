type Input = {
  displayName: string;
  image: string;
};

export type ConnectedType = {
  authenticated: boolean;
  onSave: (input: Input) => void;
};
