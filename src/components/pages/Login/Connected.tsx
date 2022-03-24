import React, { memo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storageKey, getItem } from 'lib/storage';
import TemplateLogin from 'components/templates/Login/Page';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import useHomeItems from 'hooks/useHomeItems';
import { useRecoilValue } from 'recoil';
import { authUserState } from 'store/atoms';
import {
  useCreateAuthUserMutation,
  CreateAuthUserMutationVariables,
} from 'queries/api/index';

type Props = {};

const Connected: React.FC<Props> = () => {
  const { setupAuth, onAppleLogin, onGoogleLogin, onLogout } =
    useFirebaseAuth(true);
  const { refetch } = useHomeItems();
  const authUser = useRecoilValue(authUserState);
  const authenticated = !!authUser.uid;
  const navigation = useNavigation();
  const [createAuthUserMutation] = useCreateAuthUserMutation({
    async onCompleted() {
      await refetch?.();
      navigation.goBack();
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
    <TemplateLogin onAppleLogin={onAppleLogin} onGoogleLogin={onGoogleLogin} />
  );
};

export default memo(Connected);
