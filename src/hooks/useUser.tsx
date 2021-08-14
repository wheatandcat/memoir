import { useEffect, useCallback, useState } from 'react';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { existUserID } from 'store/selectors';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { userState } from 'store/atoms';
import { useCreateUserMutation, useUserLazyQuery } from 'queries/api/index';
import { storageKey, setItem } from 'lib/storage';
import usePrevious from 'hooks/usePrevious';

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const userID = useRecoilValueLoadable(existUserID);
  const [getUser, userUserQuery] = useUserLazyQuery();
  const prevUserUserQueryLoading = usePrevious(userUserQuery.loading);

  const [createUserMutation] = useCreateUserMutation({
    async onCompleted({ createUser }) {
      await setItem(storageKey.USER_ID_KEY, createUser.id);
      setUser({ id: createUser.id, userID: '', displayName: '', image: '' });
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

  const setup = useCallback(() => {
    if (user.id) {
      return;
    }
    getUser();
  }, [user.id, getUser]);

  useEffect(() => {
    if (userID.state === 'hasValue') {
      setup();
    }
  }, [userID, setup]);

  useEffect(() => {
    if (prevUserUserQueryLoading && !userUserQuery.loading) {
      if (userUserQuery.data?.user?.id) {
        setUser((s) => ({
          ...s,
          userID: userUserQuery.data?.user?.id || '',
          displayName: userUserQuery.data?.user?.displayName || '',
          image: userUserQuery.data?.user?.image || '',
        }));

        setLoading(false);
      }
    }
  }, [userUserQuery, setUser, prevUserUserQueryLoading]);

  return {
    user,
    loading,
    onSaveWhenNotLogin,
  };
};

export default useUser;
