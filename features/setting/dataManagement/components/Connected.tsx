import Loading from "@/components/elements/Loading";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { useMutation, useQuery } from "@apollo/client";
import { deleteImageAsync } from "lib/image";
import { DeleteUserDocument, RelationshipsDocument } from "queries/api/index";
import type React from "react";
import { memo, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { screenState, userState } from "store/atoms";
import Plain from "./Plain";

const Connected: React.FC = () => {
  const user = useRecoilValue(userState);
  const setScreenState = useSetRecoilState(screenState);
  const { setupAuth, onLogout } = useFirebaseAuth(true);
  const relationshipsQuery = useQuery(RelationshipsDocument, {
    variables: {
      input: {
        after: "",
        first: 1,
      },
      skip: true,
    },
  });
  const [deleteUserMutation, deleteUserMutationData] = useMutation(
    DeleteUserDocument,
    {
      async onCompleted() {
        if (user.image) {
          await deleteImageAsync(user.image);
        }
        await onLogout();
        setScreenState({ seeYouAgain: true });
      },
    },
  );

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
