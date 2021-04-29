import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import firebase from 'lib/system/firebase';
import 'lib/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKey } from 'lib/storage';
import { existAuthUserID } from 'store/selectors';
import { authUserState } from 'store/atoms';
import Auth from 'lib/auth';

const auth = new Auth();

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
  const setAuthUser = useSetRecoilState(authUserState);
  const [setup, setSetup] = useState(false);

  const setSession = useCallback(
    async (refresh = false) => {
      const idToken = await auth.setSession(refresh);

      if (idToken) {
        const authUID = await AsyncStorage.getItem(storageKey.AUTH_UID_KEY);
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

      await firebaseLogin(credential);
      return await AsyncStorage.getItem(storageKey.AUTH_UID_KEY);
    } catch (e) {
      console.log(e);
      return null;
    }
  }, [firebaseLogin]);

  const onLogout = useCallback(async () => {
    await auth.logout();
    setAuthUser({
      uid: null,
    });
  }, [setAuthUser]);

  useEffect(() => {
    if (authUserID.state === 'hasValue') {
      if (authUserID.contents) {
        setAuthUser({ uid: authUserID.contents });
      }
    }
  }, [authUserID, setAuthUser]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
      setSetup(true);
    });

    return () => unsubscribe();
  }, []);

  return {
    setup,
    onAppleLogin,
    onLogout,
  };
};

export default useFirebaseAuth;
