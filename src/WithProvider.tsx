import React, { useEffect, useState, useCallback } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { existUserID } from 'store/selectors';
import { v4 as uuidv4 } from 'uuid';
import { userState } from 'store/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Router from './Router';

type State = {
  setup: boolean;
};

const initialState = (): State => ({
  setup: false,
});

const WithProvider = () => {
  const [state, setState] = useState<State>(initialState());

  const setUser = useSetRecoilState(userState);

  const userID = useRecoilValueLoadable(existUserID);

  const setup = useCallback(
    (id: string) => {
      setUser({ id });
      setState((s) => ({ ...s, setup: true }));
    },
    [setUser]
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

  if (!state.setup) {
    return null;
  }

  return <Router />;
};

export default WithProvider;
