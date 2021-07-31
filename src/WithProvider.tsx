import React, { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import useUser from 'hooks/useUser';
import Top from 'components/pages/Top/Connected';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { authUserState } from 'store/atoms';
import Intro from 'components/pages/Intro/Intro';
import Router from './Router';

const WithProvider = () => {
  useFirebaseAuth();
  const { loading, user, onSaveWhenNotLogin } = useUser();
  const [create, setCreate] = useState(false);

  const authUser = useRecoilValue(authUserState);

  const onCreate = useCallback((creating: boolean) => {
    setCreate(creating);
  }, []);

  const onSkip = useCallback(() => {
    setCreate(true);
    onSaveWhenNotLogin();
  }, [onSaveWhenNotLogin]);

  if (loading) {
    return null;
  }

  if (!create) {
    return <Intro onFinish={() => onCreate(false)} />;
  }

  if (!user.id && (!authUser.uid || create)) {
    return <Top onSkip={onSkip} onCreate={onCreate} />;
  }

  return <Router />;
};

export default WithProvider;
