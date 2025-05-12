import dayjs from "@/lib/dayjs";
import { RelationshipsDocument } from "@/queries/api/index";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import type React from "react";
import { memo, useCallback } from "react";
import Plain from "./Plain";
import type { Input, User } from "./type";

const Connected: React.FC = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const relationshipsQuery = useQuery(RelationshipsDocument, {
    variables: {
      input: {
        after: "",
        first: 5,
      },
      skip: false,
    },
  });

  const onSearch = useCallback(
    (input: Input) => {
      const param = {
        startDate: dayjs(input.startDate).format("YYYY-MM-DDT00:00:00+09:00"),
        endDate: dayjs(input.endDate).format("YYYY-MM-DDT00:00:00+09:00"),
        data: JSON.stringify({
          userIDList: input.userIDList,
          categoryID: input.categoryID,
          like: input.like,
          dislike: input.dislike,
          search: true,
        }),
      };
      router.push({
        pathname: "/memoir",
        params: param,
      });
    },
    [router]
  );

  const users: User[] = [
    {
      id: user.userID || "",
      image: user.image,
    },
  ];
  const relationships = relationshipsQuery.data?.relationships?.edges || [];
  const relationshipUsers: User[] = relationships.map((v) => ({
    id: v?.node?.user?.id || "",
    image: v?.node?.user?.image || "",
  }));
  const tUsers = [...users, ...relationshipUsers];

  return (
    <Plain
      loading={relationshipsQuery.loading}
      users={tUsers}
      onSearch={onSearch}
    />
  );
};

export default memo(Connected);
