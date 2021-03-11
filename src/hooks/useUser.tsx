import { useEffect, useCallback } from 'react';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { existUserID } from 'store/selectors';
import { v4 as uuidv4 } from 'uuid';
import { userState } from 'store/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUser = () => {
  const [user, setUser] = useRecoilState(userState);
  const userID = useRecoilValueLoadable(existUserID);

  const setup = useCallback(
    (id: string) => {
      if (user.id) {
        return;
      }
      setUser({ id });
    },
    [setUser, user.id]
  );

  const initUser = useCallback(async () => {
    const u = uuidv4();
    await AsyncStorage.setItem('USER_ID', u);
    setup(u);
  }, [setup]);

  useEffect(() => {
    if (userID.state === 'hasValue') {
      if (userID.contents) {
        setup(userID.contents);
      } else {
        // ユーザーIDを設定する
        initUser();
      }
    }
  }, [userID, initUser, setup]);

  return {
    user,
  };
};

export default useUser;
