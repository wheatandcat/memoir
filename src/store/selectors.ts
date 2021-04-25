import { selector } from 'recoil';
import { userState } from 'store/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKey } from 'lib/storage';

export const userIDState = selector({
  key: 'userID',
  get: ({ get }) => {
    const user = get(userState);

    return user.id;
  },
});

export const existUserID = selector({
  key: 'existUser',
  get: async () => {
    const uid = await AsyncStorage.getItem(storageKey.USER_ID_KEY);
    if (uid) {
      return uid;
    }

    return null;
  },
});

export const existAuthUserID = selector({
  key: 'existAuthUser',
  get: async () => {
    const uid = await AsyncStorage.getItem(storageKey.AUTH_UID_KEY);
    if (uid) {
      return uid;
    }

    return null;
  },
});
