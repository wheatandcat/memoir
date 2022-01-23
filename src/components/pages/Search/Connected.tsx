import React, { memo } from 'react';
import { User } from 'queries/api/index';
import Plain from './Plain';

export type Props = {};

export type ConnectedType = {
  users: Pick<User, 'id' | 'image'>[];
  onSearch: (input: any) => void;
};

const Connected: React.FC<Props> = () => {
  return (
    <Plain loading={false} error={null} users={[]} onSearch={() => null} />
  );
};

export default memo(Connected);
