import React from 'react';
import useUser from 'hooks/useUser';
import Tutorial from 'components/templates/Tutorial/Page';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import Router from './Router';

const WithProvider = () => {
  const { loading, user, onSaveWhenNotLogin } = useUser();
  const { setup } = useFirebaseAuth();
  if (loading || !setup) {
    return null;
  }

  if (!user.id) {
    return <Tutorial onPress={onSaveWhenNotLogin} />;
  }

  return <Router />;
};

export default WithProvider;
