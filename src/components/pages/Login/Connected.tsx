import React, { memo, useEffect, useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storageKey, getItem } from 'lib/storage';
import TemplateLogin from 'components/templates/Login/Page';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import useHomeItems from 'hooks/useHomeItems';
import { useRecoilValue } from 'recoil';
import { authUserState } from 'store/atoms';
import {
  CreateAuthUserDocument,
  CreateAuthUserMutationVariables,
} from 'queries/api/index';
import { useNotification } from 'containers/Notification';
import { useMutation } from '@apollo/client';

type Props = {};

const Connected: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const { setupAuth, onAppleLogin, onGoogleLogin, onLogout } = useFirebaseAuth(
    true,
    () => {
      setLoading(false);
    }
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
      Alert.alert('エラー', 'ログインに失敗した');
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
    <TemplateLogin
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
