import React, { useState, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useUser from 'hooks/useUser';
import Top from 'components/pages/Top/Connected';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { authUserState, homeState } from 'store/atoms';
import Intro from 'components/pages/Intro/Intro';
import Router from './Router';

const WithProvider = () => {
  useFirebaseAuth();
  const { loading, user, onSaveWhenNotLogin } = useUser();
  const [create, setCreate] = useState(false);
  const setHomeState = useSetRecoilState(homeState);

  const authUser = useRecoilValue(authUserState);

  const onCreate = useCallback(
    (creating: boolean) => {
      setHomeState({
        openAddItemModal: true,
      });

      setCreate(creating);
    },
    [setHomeState]
  );

  const onSkip = useCallback(() => {
    setCreate(true);
    onSaveWhenNotLogin();
  }, [onSaveWhenNotLogin]);

  if (loading) {
    return null;
  }

  if (create) {
    if (!user.id && !authUser.uid) {
      return null;
    }

    return <Intro onFinish={() => onCreate(false)} />;
  }

  if (!user.id && !authUser.uid) {
    return <Top onSkip={onSkip} onCreate={onCreate} />;
  }

  return <Router />;
};

export default WithProvider;
