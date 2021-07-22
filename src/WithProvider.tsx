import React from 'react';
import { useRecoilValue } from 'recoil';
import useUser from 'hooks/useUser';
import Top from 'components/pages/Top/Connected';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { authUserState } from 'store/atoms';
import Router from './Router';

const WithProvider = () => {
  const { loading, user, onSaveWhenNotLogin } = useUser();
  const { setup } = useFirebaseAuth();
  const authUser = useRecoilValue(authUserState);

  if (loading || !setup) {
    return null;
  }

  if (!user.id && !authUser.uid) {
    return <Top onSkip={onSaveWhenNotLogin} />;
  }

  return <Router />;
};

export default WithProvider;
