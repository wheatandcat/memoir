import { InviteQuery } from 'queries/api/index';
type Invite = InviteQuery['invite'];

export const invite = (option?: Partial<Invite>): Invite => ({
  userID: '1',
  code: 'AABBCCDD',
  ...option,
});
