import { selector } from 'recoil';
import { userState } from 'store/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const uid = await AsyncStorage.getItem('USER_ID');
    if (uid) {
      return uid;
    }

    return null;
  },
});
