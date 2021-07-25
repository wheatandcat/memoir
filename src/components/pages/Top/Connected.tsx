import React, { memo, useEffect, useCallback, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authUserState, homeItemsState } from 'store/atoms';
import TemplateTop from 'components/templates/Top/Page';
import {
  useCreateAuthUserMutation,
  CreateAuthUserMutationVariables,
  useExistAuthUserLazyQuery,
} from 'queries/api/index';
import { userState } from 'store/atoms';

export type Props = {
  onSkip: () => void;
  onCreate: (ok: boolean) => void;
};

export type ConnectedType = {
  onSkip: () => void;
  onLogin: () => void;
};

const Connected: React.FC<Props> = (props) => {
  const { setup, onAppleLogin, onGoogleLogin, onLogout } = useFirebaseAuth();
  const setUser = useSetRecoilState(userState);
  const setHomeItemsState = useSetRecoilState(homeItemsState);
  const authUser = useRecoilValue(authUserState);
  const authenticated = !!authUser.uid;
  const [getExistAuthUser, existAuthUserData] = useExistAuthUserLazyQuery();
  const creating = useRef(false);

  const [createAuthUserMutation] = useCreateAuthUserMutation({
    async onCompleted(data) {
      const id = data.createAuthUser.id;

      setUser({
        id,
        userID: '',
        displayName: '',
        image: '',
      });

      props.onCreate(false);
    },
    async onError() {
      // エラーになった場合はログアウトさせる
      Alert.alert('エラー', 'ログインに失敗した');
      onLogout();
    },
  });

  const onLogin = useCallback(() => {
    if (Platform.OS === 'ios') {
      onAppleLogin();
    } else {
      onGoogleLogin();
    }
  }, [onAppleLogin, onGoogleLogin]);

  const onSkip = useCallback(() => {
    setHomeItemsState({ items: [] });
    props.onSkip();
  }, [props, setHomeItemsState]);

  useEffect(() => {
    if (authenticated) {
      if (!existAuthUserData.loading) {
        if (existAuthUserData.data?.existAuthUser.exist === undefined) {
          getExistAuthUser();
        }
      }
    }
  }, [authenticated, existAuthUserData, getExistAuthUser]);

  useEffect(() => {
    if (!creating.current) {
      if (authenticated) {
        if (!existAuthUserData.loading) {
          if (existAuthUserData.data?.existAuthUser.exist === false) {
            creating.current = true;

            const u = uuidv4();
            const variables: CreateAuthUserMutationVariables = {
              input: {
                id: u,
                isNewUser: true,
              },
            };

            console.log('variables:', variables);

            createAuthUserMutation({
              variables,
            });
          }
        }
      }
    }
  }, [authenticated, existAuthUserData, createAuthUserMutation]);

  if (!setup) {
    return null;
  }

  return (
    <TemplateTop
      onLogin={onLogin}
      onAppleLogin={async () => {
        props.onCreate(true);
        await onAppleLogin();
      }}
      onGoogleLogin={async () => {
        props.onCreate(true);
        await onGoogleLogin();
      }}
      onSkip={onSkip}
    />
  );
};

export default memo(Connected);
