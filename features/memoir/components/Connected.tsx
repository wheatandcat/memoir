import useItemsInPeriodPaging from "@/hooks/useItemsInPeriodPaging";
import {
  ItemsInPeriodDocument,
  RelationshipsDocument,
} from "@/queries/api/index";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { confirmButtonStyles } from "react-native-modal-datetime-picker";
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
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const relationshipsQuery = useQuery(RelationshipsDocument, {
    variables: {
      input: {
        after: "",
        first: 5,
      },
      skip: false,
    },
    onCompleted: (data) => {
      if (props.userIDList && props.userIDList.length > 0) {
        return;
      }

      // props.userIDListの設定がない場合は全ユーザー選択状態に設定
      const tUserIDList: string[] = [];

      if (user?.userID) {
        tUserIDList.push(user?.userID);
      }

      if (data.relationships.edges?.length > 0) {
        const tUserIDList2 = data.relationships.edges.map(
          (v) => v?.node?.user?.id || "",
        );

        tUserIDList.push(...tUserIDList2);
      }

      setState((s) => ({
        ...s,
        userIDList: tUserIDList,
      }));
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
      pathname: "/screen-shot",
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
