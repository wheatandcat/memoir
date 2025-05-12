import Loading from "@/components/elements/Loading";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { deleteImageAsync } from "@/lib/image";
import { DeleteUserDocument, RelationshipsDocument } from "@/queries/api/index";
import { useScreenStore } from "@/store/screenStore";
import { useUserStore } from "@/store/userStore";
import { useMutation, useQuery } from "@apollo/client";
import type React from "react";
import { memo, useCallback } from "react";
import Plain from "./Plain";

const Connected: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const setScreenState = useScreenStore((state) => state.setSeeYouAgain);
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
        setScreenState(true);
      },
    }
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
