import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { authUserState } from "@/store/atoms";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useFocusEffect, useRouter } from "expo-router";
import {
  DeleteRelationshipDocument,
  RelationshipRequestsDocument,
  RelationshipsDocument,
  UserDocument,
} from "queries/api/index";
import type React from "react";
import { memo, useCallback } from "react";
import { useRecoilValue } from "recoil";
import Page from "./Page";
import type { Relationship } from "./type";

const Connected: React.FC = () => {
  const { setupAuth, onLogout } = useFirebaseAuth(true);
  const authUser = useRecoilValue(authUserState);
  const userQuery = useQuery(UserDocument);
  const router = useRouter();
  const [getRelationshipRequests, relationshipRequestsData] = useLazyQuery(
    RelationshipRequestsDocument,
    {
      fetchPolicy: "network-only",
    }
  );
  const [getRelationships, relationshipsData] = useLazyQuery(
    RelationshipsDocument,
    {
      fetchPolicy: "network-only",
    }
  );
  const [deleteRelationshipMutation, deleteRelationshipMutationData] =
    useMutation(DeleteRelationshipDocument, {
      onCompleted() {
        relationshipsData.refetch?.();
      },
    });

  useFocusEffect(
    useCallback(() => {
      if (authUser.uid) {
        userQuery?.refetch?.();
        getRelationshipRequests({
          variables: {
            input: {
              after: "",
              first: 5,
            },
            skip: true,
          },
        });
        getRelationships({
          variables: {
            input: {
              after: "",
              first: 5,
            },
            skip: false,
          },
        });
      }
    }, [authUser.uid, getRelationshipRequests, getRelationships, userQuery])
  );

  const onLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  const onUpdateProfile = useCallback(() => {
    router.push("my-page/update-profile");
  }, [router]);

  const onAddShareUser = useCallback(() => {
    router.push("/setting/add-share-user");
  }, [router]);

  const onRelationshipRequests = useCallback(() => {
    router.push("/setting/relationship-requests");
  }, [router]);

  const onDeleteRelationship = useCallback(
    (followedId: string) => {
      deleteRelationshipMutation({
        variables: {
          followedID: followedId,
        },
      });
    },
    [deleteRelationshipMutation]
  );

  if (!setupAuth || userQuery.loading) {
    return null;
  }

  const relationshipRequests =
    relationshipRequestsData.data?.relationshipRequests?.edges ?? [];
  const relationshipRequestCount = relationshipRequests.length;

  const relationshipEdges = relationshipsData?.data?.relationships?.edges ?? [];
  const relationships = relationshipEdges.map((v) => v.node);

  const user = {
    id: userQuery.data?.user?.id || "",
    userID: userQuery.data?.user?.id || "",
    displayName: userQuery.data?.user?.displayName || "",
    image: userQuery.data?.user?.image || "",
  };

  return (
    <Page
      authenticated={!!authUser.uid}
      user={user}
      relationshipRequestCount={relationshipRequestCount}
      relationships={relationships as Relationship[]}
      deleting={deleteRelationshipMutationData.loading}
      onLogout={onLogout}
      onLogin={onLogin}
      onUpdateProfile={onUpdateProfile}
      onAddShareUser={onAddShareUser}
      onRelationshipRequests={onRelationshipRequests}
      onDeleteRelationship={onDeleteRelationship}
    />
  );
};

export default memo(Connected);
