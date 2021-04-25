import * as AppleAuthentication from 'expo-apple-authentication';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import firebase from 'lib/system/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKey } from 'lib/storage';
import { existAuthUserID } from 'store/selectors';
import { authUserState } from 'store/atoms';
import Auth from 'lib/auth';
import useIsFirstRender from 'hooks/useIsFirstRender';

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

const useFirebaseAuth = () => {
  const authUserID = useRecoilValueLoadable(existAuthUserID);
  const setAuthUser = useSetRecoilState(authUserState);
  const isFirstRender = useIsFirstRender();
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
    const nonceString = nonceGen(32);

    try {
      const result = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        state: nonceString,
      });
      const provider = new firebase.auth.OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: result.identityToken || '',
        rawNonce: nonceString,
      });

      await firebaseLogin(credential);
      return await AsyncStorage.getItem(storageKey.AUTH_UID_KEY);
    } catch (e) {
      console.log(e);
      return null;
    }
  }, [firebaseLogin]);

  useEffect(() => {
    if (authUserID.state === 'hasValue') {
      if (authUserID.contents) {
        setAuthUser({ uid: authUserID.contents });
      }
    }
  }, [authUserID, setAuthUser]);

  useEffect(() => {
    if (!isFirstRender) return;

    firebase.auth().onAuthStateChanged(() => {
      setSetup(true);
    });
  }, [isFirstRender]);
  return {
    setup,
    onAppleLogin: onAppleLogin,
  };
};

export default useFirebaseAuth;
