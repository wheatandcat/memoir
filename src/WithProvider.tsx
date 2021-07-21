import React from 'react';
import useUser from 'hooks/useUser';
import Top from 'components/pages/Top/Connected';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import Router from './Router';

const WithProvider = () => {
  const { loading, user, onSaveWhenNotLogin } = useUser();
  const { setup } = useFirebaseAuth();
  if (loading || !setup) {
    return null;
  }

  if (user.id) {
    return <Top onSkip={onSaveWhenNotLogin} />;
  }

  return <Router />;
};

export default WithProvider;
