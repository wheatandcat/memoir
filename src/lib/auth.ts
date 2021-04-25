import firebase from 'lib/system/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKey } from 'lib/storage';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

class Auth {
  setSession = async (refresh = false) => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return null;
    }

    await AsyncStorage.setItem(storageKey.AUTH_UID_KEY, user.uid);

    const result = await user.getIdTokenResult(refresh);

    await AsyncStorage.setItem(storageKey.AUTH_ID_TOKEN_KEY, result.token);
    await AsyncStorage.setItem(
      storageKey.AUTH_ID_TOKEN_EXPIRATION_KEY,
      String(result.claims.exp)
    );

    return result.token;
  };
  getIdToken = async () => {
    const idToken = await AsyncStorage.getItem(storageKey.AUTH_ID_TOKEN_KEY);
    if (!idToken) {
      return null;
    }

    const expiration = await AsyncStorage.getItem(
      storageKey.AUTH_ID_TOKEN_EXPIRATION_KEY
    );
    if (Number(expiration) > dayjs().unix()) {
      return idToken;
    }

    return this.setSession(true);
  };
}

export default Auth;
