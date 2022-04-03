import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { v4 as uuidv4 } from 'uuid';
import { ResponseType } from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firebase from 'lib/system/firebase';
import 'lib/firebase';
import { storageKey, getItem, removeItem } from 'lib/storage';
import { existAuthUserID } from 'store/selectors';
import { authUserState, userState } from 'store/atoms';
import Auth from 'lib/auth';
import {
  useCreateAuthUserMutation,
  CreateAuthUserMutationVariables,
  useExistAuthUserLazyQuery,
  useUserLazyQuery,
} from 'queries/api/index';

const auth = new Auth();

WebBrowser.maybeCompleteAuthSession();

const nonceGen = (length: number) => {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export type UseFirebaseAuth = ReturnType<typeof useFirebaseAuth>;

const useFirebaseAuth = (login = false, errorCallback?: () => void) => {
  const [setup, setSetup] = useState(false);
  const authUserID = useRecoilValueLoadable(existAuthUserID);
  const [authUser, setAuthUser] = useRecoilState(authUserState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user.id) {
      // Auth認証後にuserの設定が完了した際にsetupを完了にする
      setSetup(true);
    }
  }, [user.id]);

  const [getUser, userQuery] = useUserLazyQuery({
    onCompleted: (data) => {
      setUser((s) => ({
        ...s,
        id: data?.user?.id || '',
        userID: data?.user?.id || '',
        displayName: data?.user?.displayName || '',
        image: data?.user?.image || '',
      }));
    },
  });

  const [createAuthUserMutation] = useCreateAuthUserMutation({
    async onCompleted(data) {
      const id = data.createAuthUser.id;

      setUser({
        id,
        userID: '',
        displayName: '',
        image: '',
      });

      setSetup(true);
    },
    async onError() {
      // エラーになった場合はログアウトさせる
      Alert.alert('エラー', 'ログインに失敗した');
      onLogout();
    },
  });

  const [getExistAuthUser, existAuthUserQuery] = useExistAuthUserLazyQuery({
    onCompleted: (data) => {
      if (data.existAuthUser.exist === false) {
        const u = uuidv4();
        const variables: CreateAuthUserMutationVariables = {
          input: {
            id: u,
            isNewUser: true,
          },
        };

        createAuthUserMutation({
          variables,
        });
      } else {
        // ユーザー情報を設定
        getUser();
      }
    },
  });

  const authParam: Partial<Google.GoogleAuthRequestConfig> = {
    responseType: ResponseType.IdToken,
    clientId: process.env.GOOGLE_CLIENT_ID,
    expoClientId: process.env.EXPO_GOOGLE_CLIENT_ID,
  };

  if (process.env.ENV === 'production') {
    authParam.androidClientId = process.env.ANDROID_GOOGLE_CLIENT_ID;
  }

  const [request, response, promptAsync] =
    Google.useIdTokenAuthRequest(authParam);

  const onGoogleLogin = useCallback(async () => {
    await promptAsync();
  }, [promptAsync]);

  const setSession = useCallback(
    async (refresh = false) => {
      const idToken = await auth.setSession(refresh);

      getExistAuthUser();

      if (idToken) {
        const authUID = await getItem(storageKey.AUTH_UID_KEY);
        setAuthUser({
          uid: authUID,
        });
      }

      return idToken;
    },
    [setAuthUser, getExistAuthUser]
  );

  const firebaseLogin = useCallback(
    async (credential: firebase.auth.OAuthCredential) => {
      const data = await firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error: any) => {
          console.log(error);
        });

      console.log(data);

      const ok = await setSession(true);

      return ok;
    },
    [setSession]
  );

  useEffect(() => {
    if (response?.type === 'success' && !user.id) {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebaseLogin(credential);
    } else if (response?.type === 'error') {
      console.log('error:', response);
      Alert.alert('ログインに失敗しました');
      errorCallback?.();
    }
  }, [response, firebaseLogin, errorCallback, user.id]);

  const onAppleLogin = useCallback(async () => {
    const nonce = nonceGen(32);
    const digestedNonce = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      nonce
    );

    try {
      const result = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: digestedNonce,
      });
      const provider = new firebase.auth.OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: result.identityToken || '',
        rawNonce: nonce,
      });

      firebaseLogin(credential);
    } catch (e) {
      console.log('error:', e);
      Alert.alert('ログインに失敗しました');
      errorCallback?.();
    }
  }, [firebaseLogin, errorCallback]);

  const onLogout = useCallback(async () => {
    await auth.logout();
    await removeItem(storageKey.USER_ID_KEY);

    setAuthUser({
      uid: null,
    });
    setUser({ id: null, userID: '', displayName: '', image: '' });

    userQuery.client?.clearStore();
    existAuthUserQuery.client?.clearStore();
  }, [setAuthUser, setUser, userQuery.client, existAuthUserQuery.client]);

  useEffect(() => {
    if (authUser.uid) {
      return;
    }
    if (authUserID.state === 'hasValue') {
      if (authUserID.contents) {
        setAuthUser({ uid: authUserID.contents });
      }
    }
  }, [authUserID, setAuthUser, authUser.uid]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((aUser) => {
      if (aUser) {
        setSession(true);
      } else {
        if (!login) {
          // ログアウトした時
          setAuthUser({
            uid: null,
          });
          setUser({ id: null, userID: '', displayName: '', image: '' });
        }

        setSetup(true);
      }
    });

    return () => unsubscribe();
  }, [setUser, setAuthUser, setSession, login]);

  return {
    setupAuth: setup,
    request,
    onAppleLogin,
    onGoogleLogin,
    onLogout,
  };
};

export default useFirebaseAuth;
