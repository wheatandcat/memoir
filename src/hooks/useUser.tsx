import { useEffect, useCallback, useState } from 'react';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import * as Sentry from 'sentry-expo';
import { existUserID } from 'store/selectors';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { userState } from 'store/atoms';
import { CreateUserDocument, UserDocument } from 'queries/api/index';
import { storageKey, setItem } from 'lib/storage';
import usePrevious from 'hooks/usePrevious';
import { useLazyQuery, useMutation } from '@apollo/client';

const useUser = () => {
  const [setupUser, setSetupUser] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const userID = useRecoilValueLoadable(existUserID);

  useEffect(() => {
    if (user.id) {
      // userの設定が完了した際にsetupを完了にする
      setSetupUser(true);
    }
  }, [user.id]);

  const [getUser] = useLazyQuery(UserDocument, {
    onCompleted: (data) => {
      setUser((s) => ({
        ...s,
        id: data?.user?.id || '',
        userID: data?.user?.id || '',
        displayName: data?.user?.displayName || '',
        image: data?.user?.image || '',
      }));
    },
  });

  const prevUserID = usePrevious(user.id);

  const [createUserMutation] = useMutation(CreateUserDocument, {
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
    if (setupUser) {
      return;
    }

    if (!user.id && !userID.contents) {
      setSetupUser(true);
      return;
    }

    getUser();
  }, [user.id, getUser, userID.contents, setupUser]);

  useEffect(() => {
    if (userID.state === 'hasValue') {
      setup();
    }
  }, [userID, setup]);

  useEffect(() => {
    if (user.id) {
      if (user.id !== prevUserID) {
        Sentry.Native.setUser({
          id: user.id,
        });
      }
    }
  }, [user.id, prevUserID]);

  return {
    user,
    setupUser,
    onSaveWhenNotLogin,
  };
};

export default useUser;
