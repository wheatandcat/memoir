import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import useHomeItems from "@/hooks/useHomeItems";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useNotification } from "containers/Notification";
import { getItem, storageKey } from "lib/storage";
import {
  CreateAuthUserDocument,
  type CreateAuthUserMutationVariables,
} from "queries/api/index";
import type React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useRecoilValue } from "recoil";
import { authUserState } from "store/atoms";
import Page from "./Page";

const Connected: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { setupAuth, onAppleLogin, onGoogleLogin, onLogout } = useFirebaseAuth(
    true,
    () => {
      setLoading(false);
    },
  );
  const { refetch } = useHomeItems();
  const { onPermissionRequest } = useNotification();
  const authUser = useRecoilValue(authUserState);
  const authenticated = !!authUser.uid;
  const navigation = useNavigation();
  const [createAuthUserMutation] = useMutation(CreateAuthUserDocument, {
    async onCompleted() {
      onPermissionRequest?.(async () => {
        await refetch?.();
        navigation.goBack();
      });
    },
    async onError() {
      // エラーになった場合はログアウトさせる
      Alert.alert("エラー", "ログインに失敗した");
      onLogout();
    },
  });

  const createAuthUser = useCallback(async () => {
    const userID = await getItem(storageKey.USER_ID_KEY);

    const variables: CreateAuthUserMutationVariables = {
      input: {
        id: String(userID),
        isNewUser: false,
      },
    };

    createAuthUserMutation({ variables });
  }, [createAuthUserMutation]);

  useEffect(() => {
    if (authenticated) {
      createAuthUser();
    }
  }, [authenticated, createAuthUser]);

  if (!setupAuth) {
    return null;
  }

  return (
    <Page
      loading={loading}
      onAppleLogin={async () => {
        setLoading(true);
        onAppleLogin();
      }}
      onGoogleLogin={() => {
        setLoading(true);
        onGoogleLogin();
      }}
    />
  );
};

export default memo(Connected);
