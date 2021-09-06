import React, { memo } from 'react';
import {
  useItemsInPeriodQuery,
  useRelationshipsQuery,
} from 'queries/api/index';
import { User as TUser } from 'store/atoms';
import { useRecoilValue } from 'recoil';
import { userState } from 'store/atoms';
import Plain from './Plain';

export type Props = {
  startDate: string;
  endDate: string;
  selectedUserIDList: string[];
};

export type ConnectedType = Omit<Props, 'selectedUserIDList'> & {
  users: User[];
};

type User = Omit<TUser, 'userID'> & {
  id: string;
};

const Connected: React.FC<Props> = (props) => {
  const user = useRecoilValue(userState);

  const relationshipsQuery = useRelationshipsQuery({
    variables: {
      input: {
        after: '',
        first: 5,
      },
      skip: false,
    },
  });

  const { data, loading, error } = useItemsInPeriodQuery({
    variables: {
      input: {
        startDate: props.startDate,
        endDate: props.endDate,
        userIDList: props.selectedUserIDList,
        first: 200,
        after: '',
      },
    },
  });

  const users: User[] = [
    {
      id: user.userID || '',
      displayName: user.displayName,
      image: user.image,
    },
  ];

  const relationships = relationshipsQuery.data?.relationships?.edges || [];
  const relationshipUsers: User[] = relationships.map((v) => ({
    id: v?.node?.user?.id || '',
    displayName: v?.node?.user?.displayName || '',
    image: v?.node?.user?.image || '',
  }));

  return (
    <Plain
      data={data}
      loading={loading}
      error={error}
      users={[...users, ...relationshipUsers]}
      startDate={props.startDate}
      endDate={props.endDate}
    />
  );
};

export default memo(Connected);
