import React, { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import useUser from 'hooks/useUser';
import Top from 'components/pages/Top/Connected';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { authUserState } from 'store/atoms';
import Router from './Router';

const WithProvider = () => {
  useFirebaseAuth();
  const { loading, user, onSaveWhenNotLogin } = useUser();
  const [create, setCreate] = useState(false);

  const authUser = useRecoilValue(authUserState);

  const onCreate = useCallback((creating: boolean) => {
    setCreate(creating);
  }, []);

  if (loading) {
    return null;
  }

  console.log('setup:', user.id, authUser.uid);

  if (!user.id && (!authUser.uid || create)) {
    return <Top onSkip={onSaveWhenNotLogin} onCreate={onCreate} />;
  }

  return <Router />;
};

export default WithProvider;
