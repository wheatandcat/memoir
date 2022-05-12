import React, { memo, useCallback } from 'react';
import {
  useDeleteUserMutation,
  useRelationshipsQuery,
} from 'queries/api/index';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import Loading from 'components/atoms/Loading';
import { deleteImageAsync } from 'lib/image';
import { userState, screenState } from 'store/atoms';
import Plain from './Plain';

export type Props = {};

export type ConnectedType = {
  loading: boolean;
  disabledDeleteButton: boolean;
  onDelete: () => void;
};

const Connected: React.FC<Props> = () => {
  const user = useRecoilValue(userState);
  const setScreenState = useSetRecoilState(screenState);
  const { setupAuth, onLogout } = useFirebaseAuth(true);
  const relationshipsQuery = useRelationshipsQuery({
    variables: {
      input: {
        after: '',
        first: 1,
      },
      skip: true,
    },
  });
  const [deleteUserMutation, deleteUserMutationData] = useDeleteUserMutation({
    async onCompleted() {
      if (user.image) {
        await deleteImageAsync(user.image);
      }
      await onLogout();
      setScreenState({ seeYouAgain: true });
    },
  });

  const onDelete = useCallback(() => {
    deleteUserMutation();
  }, [deleteUserMutation]);

  if (!setupAuth || relationshipsQuery.loading) {
    return <Loading />;
  }

  return (
    <Plain
      loading={deleteUserMutationData.loading}
      error={deleteUserMutationData.error}
      onDelete={onDelete}
      disabledDeleteButton={
        (relationshipsQuery?.data?.relationships?.edges ?? []).length > 0
      }
    />
  );
};

export default memo(Connected);
