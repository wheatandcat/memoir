import { onAuthStateChanged,  signOut, type User } from 'firebase/auth';
import { storageKey, setItem, getItem, removeItem } from 'lib/storage';
import dayjs from 'lib/dayjs';
import { getFirebaseAuthApp } from 'lib/firebase';

const auth = getFirebaseAuthApp();

const initFirebaseAuth = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user オブジェクトを resolve
      resolve(user);

      // 登録解除
      unsubscribe();
    });
  });
};

class Auth {
  setSession = async (refresh = false) => {
    const user = await initFirebaseAuth();
    if (!user) {
      return null;
    }

    await setItem(storageKey.AUTH_UID_KEY, user.uid);

    const result = await user.getIdTokenResult(refresh);

    await setItem(storageKey.AUTH_ID_TOKEN_KEY, result.token);
    await setItem(
      storageKey.AUTH_ID_TOKEN_EXPIRATION_KEY,
      String(result.claims.exp)
    );

    return result.token;
  };
  getIdToken = async () => {
    const idToken = await getItem(storageKey.AUTH_ID_TOKEN_KEY);
    if (!idToken) {
      return null;
    }

    const expiration = await getItem(storageKey.AUTH_ID_TOKEN_EXPIRATION_KEY);

    if (Number(expiration) > dayjs().unix()) {
      return idToken;
    }

    return this.setSession(true);
  };
  logout = async () => {
    await signOut(auth);

    await removeItem(storageKey.AUTH_UID_KEY);
    await removeItem(storageKey.AUTH_ID_TOKEN_KEY);
    await removeItem(storageKey.AUTH_ID_TOKEN_EXPIRATION_KEY);
  };
}

export default Auth;
