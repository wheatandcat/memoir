import { useEffect, useCallback, useState } from 'react';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { existUserID } from 'store/selectors';
import { v4 as uuidv4 } from 'uuid';
import { userState } from 'store/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCreateUserMutation } from 'queries/api/index';

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const userID = useRecoilValueLoadable(existUserID);
  const [createUserMutation] = useCreateUserMutation({
    async onCompleted({ createUser }) {
      await AsyncStorage.setItem('USER_ID', createUser.id);
      setUser({ id: createUser.id });
    },
  });

  const onSaveWhenNotLogin = useCallback(() => {
    // ログインせずにチュートリアルを超えた場合は、こちらから保存
    const u = uuidv4();

    const variables = {
      input: {
        id: u,
      },
    };

    createUserMutation({ variables });
  }, [createUserMutation]);

  const setup = useCallback(
    (id: string) => {
      if (user.id) {
        return;
      }
      setUser({ id });
    },
    [setUser, user.id]
  );

  useEffect(() => {
    if (userID.state === 'hasValue') {
      if (userID.contents) {
        setup(userID.contents);
      }

      setTimeout(() => setLoading(false), 1);
    }
  }, [userID, setup]);

  return {
    user,
    loading,
    onSaveWhenNotLogin,
  };
};

export default useUser;
