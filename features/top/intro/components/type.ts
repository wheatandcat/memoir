export type ConnectedType = {
  onSaveNotification: (input: Input, callback: () => void) => void;
  onFinish: () => void;
};

export type Input = {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
};
