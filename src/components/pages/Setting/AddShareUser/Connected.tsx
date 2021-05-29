import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import {
  useInviteQuery,
  InviteQuery,
  useCreateInviteMutation,
  useUpdateInviteMutation,
} from 'queries/api/index';
import { useRecoilValue } from 'recoil';
import { userState, User } from 'store/atoms';
import Plain from './Plain';

export type Props = {};

export type Invite = InviteQuery['invite'];

export type ConnectedType = {
  user: User;
  onCreateInvite: () => void;
  onUpdateInvite: () => void;
  creating: boolean;
  updating: boolean;
  loading: boolean;
};

const Connected: React.FC<Props> = () => {
  const { loading, data, error, refetch } = useInviteQuery();
  const user = useRecoilValue(userState);
  const [
    createInviteMutation,
    createInviteMutationData,
  ] = useCreateInviteMutation({
    onCompleted() {
      refetch();
    },
    onError() {
      Alert.alert('エラー', '作成に失敗しました');
    },
  });
  const [
    updateInviteMutation,
    updateInviteMutationData,
  ] = useUpdateInviteMutation({
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

  return (
    <Plain
      loading={loading}
      error={error}
      data={data}
      user={user}
      onCreateInvite={onCreateInvite}
      onUpdateInvite={onUpdateInvite}
      creating={createInviteMutationData.loading}
      updating={updateInviteMutationData.loading}
    />
  );
};

export default memo(Connected);
