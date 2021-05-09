import { User } from 'queries/api/index';

export const user = (option?: Partial<User>): User => ({
  id: '1',
  displayName: 'test',
  updatedAt: '2021-01-01T00:00:00+09:00',
  createdAt: '2021-01-01T00:00:00+09:00',
  ...option,
});
