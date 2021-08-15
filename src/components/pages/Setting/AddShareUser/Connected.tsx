import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import {
  useInviteQuery,
  InviteQuery,
  useInviteByCodeLazyQuery,
  InviteByCodeQueryVariables,
  useCreateInviteMutation,
  useUpdateInviteMutation,
  CreateRelationshipRequestMutationVariables,
  CreateRelationshipRequestMutation,
  useCreateRelationshipRequestMutation,
} from 'queries/api/index';
import { useRecoilValue } from 'recoil';
import { userState, User } from 'store/atoms';
import Plain from './Plain';

export type Props = {};

export type Invite = InviteQuery['invite'];

export type ConnectedType = {
  user: User;
  requestUser:
    | CreateRelationshipRequestMutation['createRelationshipRequest']['user']
    | null;
  onCreateInvite: () => void;
  onUpdateInvite: () => void;
  onSearchInviteCode: (code: string) => void;
  onCreateRelationshipRequest: (code: string) => void;
  creating: boolean;
  updating: boolean;
  loading: boolean;
  requesting: boolean;
  confirmUser: {
    id: string;
    displayName: string;
    image: string;
  } | null;
};

const Connected: React.FC<Props> = () => {
  const { loading, data, error, refetch } = useInviteQuery();
  const [getInviteByCode, inviteByCodeData] = useInviteByCodeLazyQuery({
    fetchPolicy: 'network-only',
  });

  const [createRelationshipRequestMutation, relationshipRequestMutationData] =
    useCreateRelationshipRequestMutation();

  const user = useRecoilValue(userState);
  const [createInviteMutation, createInviteMutationData] =
    useCreateInviteMutation({
      onCompleted() {
        refetch();
      },
      onError() {
        Alert.alert('エラー', '作成に失敗しました');
      },
    });
  const [updateInviteMutation, updateInviteMutationData] =
    useUpdateInviteMutation({
      onCompleted() {
        refetch();
      },
      onError() {
        Alert.alert('エラー', '更新に失敗しました');
      },
    });

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
    [createRelationshipRequestMutation]
  );

  const onCreateRelationshipRequest = useCallback(
    (code: string) => {
      const variables: InviteByCodeQueryVariables = {
        code,
      };
      getInviteByCode({ variables });
    },
    [getInviteByCode]
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
