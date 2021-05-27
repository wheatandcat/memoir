import React, { memo } from 'react';
import { useInviteQuery, InviteQuery } from 'queries/api/index';
import Plain from './Plain';

export type Props = {};

export type Invite = InviteQuery['invite'];

export type ConnectedType = {};

const Connected: React.FC<Props> = () => {
  const { loading, data, error } = useInviteQuery({});

  return <Plain loading={loading} error={error} data={data} />;
};

export default memo(Connected);
