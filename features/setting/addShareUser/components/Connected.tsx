import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  CreateInviteDocument,
  CreateRelationshipRequestDocument,
  type CreateRelationshipRequestMutationVariables,
  InviteByCodeDocument,
  type InviteByCodeQueryVariables,
  InviteDocument,
  UpdateInviteDocument,
} from "queries/api/index";
import type React from "react";
import { memo, useCallback } from "react";
import { Alert } from "react-native";
import { useRecoilValue } from "recoil";
import { userState } from "store/atoms";
import Plain from "./Plain";

const Connected: React.FC = () => {
  const { loading, data, error, refetch } = useQuery(InviteDocument);
  const [getInviteByCode, inviteByCodeData] = useLazyQuery(
    InviteByCodeDocument,
    {
      fetchPolicy: "network-only",
    },
  );

  const [createRelationshipRequestMutation, relationshipRequestMutationData] =
    useMutation(CreateRelationshipRequestDocument);

  const user = useRecoilValue(userState);
  const [createInviteMutation, createInviteMutationData] = useMutation(
    CreateInviteDocument,
    {
      onCompleted() {
        refetch();
      },
      onError() {
        Alert.alert("エラー", "作成に失敗しました");
      },
    },
  );
  const [updateInviteMutation, updateInviteMutationData] = useMutation(
    UpdateInviteDocument,
    {
      onCompleted() {
        refetch();
      },
      onError() {
        Alert.alert("エラー", "更新に失敗しました");
      },
    },
  );

  const onCreateInvite = useCallback(() => {
    createInviteMutation();
  }, [createInviteMutation]);

  const onUpdateInvite = useCallback(() => {
    updateInviteMutation();
  }, [updateInviteMutation]);

  const onSearchInviteCode = useCallback(
    (code: string) => {
      const variables: CreateRelationshipRequestMutationVariables = {
        input: {
          code,
        },
      };
      createRelationshipRequestMutation({ variables });
    },
    [createRelationshipRequestMutation],
  );

  const onCreateRelationshipRequest = useCallback(
    (code: string) => {
      const variables: InviteByCodeQueryVariables = {
        code,
      };
      getInviteByCode({ variables });
    },
    [getInviteByCode],
  );

  return (
    <Plain
      loading={loading}
      error={error}
      data={data}
      user={user}
      onCreateInvite={onCreateInvite}
      onUpdateInvite={onUpdateInvite}
      onSearchInviteCode={onSearchInviteCode}
      onCreateRelationshipRequest={onCreateRelationshipRequest}
      confirmUser={inviteByCodeData.data?.inviteByCode ?? null}
      creating={createInviteMutationData.loading}
      updating={updateInviteMutationData.loading}
      requesting={relationshipRequestMutationData.loading}
      requestUser={
        relationshipRequestMutationData.data?.createRelationshipRequest?.user ??
        null
      }
    />
  );
};

export default memo(Connected);
