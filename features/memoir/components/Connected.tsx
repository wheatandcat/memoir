import useItemsInPeriodPaging from "@/hooks/useItemsInPeriodPaging";
import usePerformance, { traceEvent } from "@/hooks/usePerformance";
import { userState } from "@/store/atoms";
import { useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import {
  ItemsInPeriodDocument,
  RelationshipsDocument,
} from "queries/api/index";
import { type FC, memo, useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import Plain from "./Plain";
import type { User } from "./type";

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

const initialState = (userIDList: string[] | undefined) => ({
  after: "",
  userIDList,
});

const Connected: FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState(props.userIDList));
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const user = useRecoilValue(userState);
  const router = useRouter();

  const relationshipsQuery = useQuery(RelationshipsDocument, {
    variables: {
      input: {
        after: "",
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

  const queryResult = useQuery(ItemsInPeriodDocument, {
    variables: {
      input,
    },
    fetchPolicy: "network-only",
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

  const onChangeUserID = useCallback(
    (userIDList: string[]) => {
      setIsFilter(true);
      reset();

      setState((s) => ({
        ...s,
        userIDList,
        after: "",
      }));
    },
    [reset],
  );

  const users: User[] = [
    { id: user.userID || "", displayName: user.displayName, image: user.image },
  ];

  const relationships = relationshipsQuery.data?.relationships?.edges || [];
  const relationshipUsers: User[] = relationships.map((v) => ({
    id: v?.node?.user?.id || "",
    displayName: v?.node?.user?.displayName || "",
    image: v?.node?.user?.image || "",
  }));

  const tUsers = [...users, ...relationshipUsers];
  const selectedUserIDList = state.userIDList || tUsers.map((v) => v.id);

  const onScreenShot = useCallback(() => {
    let tSelectedUserIDList: string[] | undefined = selectedUserIDList.filter(
      (v) => v !== "",
    );
    if (tSelectedUserIDList.length === 0) {
      tSelectedUserIDList = undefined;
    }

    router.push({
      pathname: "/memoir/screen-shot",
      params: {
        startDate: props.startDate,
        endDate: props.endDate,
        data: JSON.stringify({
          selectedUserIDList: tSelectedUserIDList,
          categoryID: props.categoryID,
          like: props.like,
          dislike: props.dislike,
        }),
      },
    });
  }, [
    props.startDate,
    props.endDate,
    router.push,
    selectedUserIDList,
    props.categoryID,
    props.like,
    props.dislike,
  ]);

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
      onScreenShot={onScreenShot}
      onChangeUserID={onChangeUserID}
    />
  );
};

export default memo(Connected);
