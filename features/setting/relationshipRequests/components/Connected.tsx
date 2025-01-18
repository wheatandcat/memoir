import useRelationshipRequestsPaging from "@/hooks/useRelationshipRequestsPaging";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import {
  AcceptRelationshipRequestDocument,
  NgRelationshipRequestDocument,
  RelationshipRequestsDocument,
  type RelationshipRequestsQueryVariables as Variables,
} from "queries/api/index";
import type React from "react";
import { memo, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Plain from "./Plain";

const Connected: React.FC = () => {
  const [endCursor, setEndCursor] = useState("");
  const [reloadKey, setReloadKey] = useState("");
  const router = useRouter();

  const queryResult = useQuery(RelationshipRequestsDocument, {
    variables: {
      input: {
        first: 5,
        after: endCursor,
      },
      skip: false,
      reloadKey,
    } as Variables & { reloadKey: string },
    nextFetchPolicy: "network-only",
  });

  const { items, pageInfo, reset } = useRelationshipRequestsPaging(
    queryResult,
    {
      merge: true,
    },
  );

  const [
    acceptRelationshipRequestMutation,
    acceptRelationshipRequestMutationData,
  ] = useMutation(AcceptRelationshipRequestDocument, {
    onCompleted(data) {
      reset();
      setEndCursor("");
      setReloadKey(uuidv4());

      const followerId = data.acceptRelationshipRequest.followerId;
      const user = items.find((v) => v.followerId === followerId);
      router.push({
        pathname: "/setting/accepted-relationship",
        params: {
          displayName: user?.user?.displayName || "",
          image: user?.user?.image || "",
        },
      });
    },
  });
  const [ngRelationshipRequestMutation, ngRelationshipRequestMutationData] =
    useMutation(NgRelationshipRequestDocument, {
      onCompleted() {
        reset();
        setEndCursor("");
        setReloadKey(uuidv4());
      },
    });

  const onLoadMore = useCallback((after: string | null) => {
    setEndCursor(after || "");
  }, []);

  const onOK = useCallback(
    (followedId: string) => {
      if (
        acceptRelationshipRequestMutationData.loading ||
        ngRelationshipRequestMutationData.loading
      ) {
        return;
      }

      acceptRelationshipRequestMutation({
        variables: {
          followedID: followedId,
        },
      });
    },
    [
      acceptRelationshipRequestMutation,
      acceptRelationshipRequestMutationData.loading,
      ngRelationshipRequestMutationData.loading,
    ],
  );
  const onNG = useCallback(
    (followedId: string) => {
      if (
        acceptRelationshipRequestMutationData.loading ||
        ngRelationshipRequestMutationData.loading
      ) {
        return;
      }

      ngRelationshipRequestMutation({
        variables: {
          followedID: followedId,
        },
      });
    },
    [
      ngRelationshipRequestMutation,
      acceptRelationshipRequestMutationData.loading,
      ngRelationshipRequestMutationData.loading,
    ],
  );

  return (
    <Plain
      loading={queryResult.loading}
      acceptRequesting={acceptRelationshipRequestMutationData.loading}
      ngRequesting={ngRelationshipRequestMutationData.loading}
      error={queryResult.error}
      onLoadMore={onLoadMore}
      items={items}
      pageInfo={pageInfo}
      onOK={onOK}
      onNG={onNG}
    />
  );
};

export default memo(Connected);
