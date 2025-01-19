export type ConnectedType = {
  onSave: (input: Input) => void;
};

export type Input = {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
};
