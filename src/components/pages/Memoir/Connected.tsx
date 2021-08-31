import React, { memo, useCallback, useState } from 'react';
import {
  useItemsInPeriodQuery,
  useRelationshipsQuery,
} from 'queries/api/index';
import { useNavigation } from '@react-navigation/native';
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
  userIDList?: string[];
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
  selectedUserIDList: string[];
  onItem: () => void;
  onScreenShot: () => void;
  onLoadMore: (after: string | null) => void;
  onChangeUserID: (userIDList: string[]) => void;
};

const initialState = () => ({
  after: '',
});

const Connected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());
  const user = useRecoilValue(userState);
  const navigation = useNavigation();

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
        userIDList: state.userIDList,
      },
    },
  });

  const { items, pageInfo, reset } = useItemsInPeriodPaging(queryResult, {
    merge: true,
  });

  const onLoadMore = useCallback((after: string | null) => {
    setState((s) => ({
      ...s,
      after,
    }));
  }, []);

  const onItem = useCallback(() => {}, []);

  const onChangeUserID = useCallback(
    (userIDList: string[]) => {
      reset();

      setState((s) => ({ ...s, userIDList }));
    },
    [reset]
  );

  const onScreenShot = useCallback(() => {
    navigation.navigate('MemoirScreenShot', {
      startDate: props.startDate,
      endDate: props.endDate,
    });
  }, [props, navigation]);

  const users: User[] = [
    { id: user.userID || '', displayName: user.displayName, image: user.image },
  ];

  const relationships = relationshipsQuery.data?.relationships?.edges || [];
  const relationshipUsers: User[] = relationships.map((v) => ({
    id: v?.node?.user?.id || '',
    displayName: v?.node?.user?.displayName || '',
    image: v?.node?.user?.image || '',
  }));

  const tUsers = [...users, ...relationshipUsers];

  return (
    <Plain
      startDate={props.startDate}
      endDate={props.endDate}
      items={items}
      users={tUsers}
      selectedUserIDList={state.userIDList || tUsers.map((v) => v.id)}
      pageInfo={pageInfo}
      onLoadMore={onLoadMore}
      loading={queryResult.loading}
      error={queryResult.error}
      onItem={onItem}
      onScreenShot={onScreenShot}
      onChangeUserID={onChangeUserID}
    />
  );
};

export default memo(Connected);
