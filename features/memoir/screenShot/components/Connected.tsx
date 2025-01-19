import { userState } from "@/store/atoms";
import { useQuery } from "@apollo/client";
import {
  ItemsInPeriodDocument,
  RelationshipsDocument,
} from "queries/api/index";
import type React from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import Plain from "./Plain";
import type { User } from "./type";

type Props = {
  startDate: string;
  endDate: string;
  selectedUserIDList?: string[];
  categoryID: number;
  like: boolean;
  dislike: boolean;
};

const Connected: React.FC<Props> = (props) => {
  const user = useRecoilValue(userState);

  const relationshipsQuery = useQuery(RelationshipsDocument, {
    variables: {
      input: {
        after: "",
        first: 5,
      },
      skip: false,
    },
  });

  const { data, loading, error } = useQuery(ItemsInPeriodDocument, {
    variables: {
      input: {
        startDate: props.startDate,
        endDate: props.endDate,
        userIDList: props.selectedUserIDList,
        categoryID: props.categoryID,
        like: props.like,
        dislike: props.dislike,
        first: 100,
        after: "",
      },
    },
  });

  const users: User[] = [
    {
      id: user.userID || "",
      displayName: user.displayName,
      image: user.image,
    },
  ];

  const relationships = relationshipsQuery.data?.relationships?.edges || [];
  const relationshipUsers: User[] = relationships.map((v) => ({
    id: v?.node?.user?.id || "",
    displayName: v?.node?.user?.displayName || "",
    image: v?.node?.user?.image || "",
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
