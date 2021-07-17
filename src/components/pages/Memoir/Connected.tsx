import React, { memo, useCallback, useState } from 'react';
import {
  useItemsInPeriodQuery,
  useRelationshipsQuery,
} from 'queries/api/index';
import useItemsInPeriodPaging from 'hooks/useItemsInPeriodPaging';
import { useRecoilValue } from 'recoil';
import { userState } from 'store/atoms';
import Plain from './Plain';

type Props = {
  startDate: string;
  endDate: string;
};

type State = {
  after: string | null;
};

type User = {
  id: string;
  displayName: string;
  image: string;
};

export type ConnectedType = {
  startDate: string;
  endDate: string;
  users: User[];
  onItem: () => void;
  onLoadMore: (after: string | null) => void;
};

const initialState = () => ({
  after: '',
});

const Connected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());
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

  const queryResult = useItemsInPeriodQuery({
    variables: {
      input: {
        startDate: props.startDate,
        endDate: props.endDate,
        first: 8,
        after: state.after,
      },
    },
  });

  const { items, pageInfo } = useItemsInPeriodPaging(queryResult, {
    merge: true,
  });

  const onLoadMore = useCallback((after: string | null) => {
    setState((s) => ({
      ...s,
      after,
    }));
  }, []);

  const onItem = useCallback(() => {}, []);

  const users: User[] = [
    { id: user.userID || '', displayName: user.displayName, image: user.image },
  ];

  const relationships = relationshipsQuery.data?.relationships?.edges || [];
  const relationshipUsers: User[] = relationships.map((v) => ({
    id: v?.node?.user?.id || '',
    displayName: v?.node?.user?.displayName || '',
    image: v?.node?.user?.image || '',
  }));

  return (
    <Plain
      startDate={props.startDate}
      endDate={props.endDate}
      items={items}
      users={[...users, ...relationshipUsers]}
      pageInfo={pageInfo}
      onLoadMore={onLoadMore}
      loading={queryResult.loading}
      error={queryResult.error}
      onItem={onItem}
    />
  );
};

export default memo(Connected);
