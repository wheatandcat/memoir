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
import { ScreenNavigationProp as MemoirScreenNavigationProp } from './';

type Props = {
  startDate: string;
  endDate: string;
  userIDList: string[] | undefined;
  categoryID: number;
  like: boolean;
  dislike: boolean;
  search: boolean;
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
  isFilter: boolean;
  search: boolean;
  onItem: () => void;
  onScreenShot: () => void;
  onLoadMore: (after: string | null) => void;
  onChangeUserID: (userIDList: string[]) => void;
};

const initialState = (userIDList: string[] | undefined) => ({
  after: '',
  userIDList,
});

const Connected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState(props.userIDList));
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const user = useRecoilValue(userState);
  const navigation = useNavigation<MemoirScreenNavigationProp>();

  const relationshipsQuery = useRelationshipsQuery({
    variables: {
      input: {
        after: '',
        first: 5,
      },
      skip: false,
    },
  });

  const input = {
    startDate: props.startDate,
    endDate: props.endDate,
    first: 8,
    after: state.after,
    userIDList: state.userIDList,
    categoryID: props.categoryID,
    like: props.like,
    dislike: props.dislike,
  };

  const queryResult = useItemsInPeriodQuery({
    variables: {
      input,
    },
    fetchPolicy: 'network-only',
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
      setIsFilter(true);
      reset();

      setState((s) => ({
        ...s,
        userIDList,
        after: '',
      }));
    },
    [reset]
  );

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
  const selectedUserIDList = state.userIDList || tUsers.map((v) => v.id);

  const onScreenShot = useCallback(() => {
    navigation.navigate('MemoirScreenShot', {
      startDate: props.startDate,
      endDate: props.endDate,
      selectedUserIDList,
      categoryID: props.categoryID,
      like: props.like,
      dislike: props.dislike,
    });
  }, [props, navigation, selectedUserIDList]);

  return (
    <Plain
      startDate={props.startDate}
      endDate={props.endDate}
      isFilter={isFilter}
      items={items}
      users={tUsers}
      search={props.search}
      selectedUserIDList={selectedUserIDList}
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
