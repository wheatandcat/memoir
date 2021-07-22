// FIXME: useIdTokenAuthRequestとRN debuggerを同時に使用するとエラーになるので開発時はこちらを使用
// @see: https://github.com/expo/expo/issues/12712

import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';
import {
  useRecoilValueLoadable,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firebase from 'lib/system/firebase';
import 'lib/firebase';
import { storageKey, getItem, removeItem } from 'lib/storage';
import { existAuthUserID } from 'store/selectors';
import { authUserState, userState } from 'store/atoms';
import Auth from 'lib/auth';
import { useUserLazyQuery } from 'queries/api/index';
import usePrevious from 'hooks/usePrevious';

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

const useFirebaseAuth = () => {
  const authUserID = useRecoilValueLoadable(existAuthUserID);
  const [authUser, setAuthUser] = useRecoilState(authUserState);
  const [getUser, userUserQuery] = useUserLazyQuery();
  const prevUserUserQueryLoading = usePrevious(userUserQuery.loading);

  const setUser = useSetRecoilState(userState);

  const [setup, setSetup] = useState(false);

  const request = {};
  const onGoogleLogin = useCallback(() => {}, []);

  const setSession = useCallback(
    async (refresh = false) => {
      const idToken = await auth.setSession(refresh);

      if (idToken) {
        const authUID = await getItem(storageKey.AUTH_UID_KEY);
        setAuthUser({
          uid: authUID,
        });
      }

      return idToken;
    },
    [setAuthUser]
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

      return await setSession(true);
    },
    [setSession]
  );

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
    }
  }, [firebaseLogin]);

  const onLogout = useCallback(async () => {
    await auth.logout();
    await removeItem(storageKey.USER_ID_KEY);

    setAuthUser({
      uid: null,
    });
    setUser({ id: null, userID: '', displayName: '', image: '' });
  }, [setAuthUser, setUser]);

  useEffect(() => {
    if (authUser.uid) {
      return;
    }
    if (authUserID.state === 'hasValue') {
      if (authUserID.contents) {
        setAuthUser({ uid: authUserID.contents });
        getUser();
      }
    }
  }, [authUserID, setAuthUser, authUser.uid, getUser]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
      setSetup(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (prevUserUserQueryLoading && !userUserQuery.loading) {
      if (userUserQuery.data?.user?.id) {
        setUser((s) => ({
          ...s,
          userID: userUserQuery.data?.user?.id || '',
          displayName: userUserQuery.data?.user?.displayName || '',
          image: userUserQuery.data?.user?.image || '',
        }));
      }
    }
  }, [userUserQuery, setUser, prevUserUserQueryLoading]);

  return {
    setup,
    request,
    onAppleLogin,
    onGoogleLogin,
    onLogout,
  };
};

export default useFirebaseAuth;
