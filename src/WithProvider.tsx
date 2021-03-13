import React from 'react';
import useUser from 'hooks/useUser';
import Tutorial from 'components/templates/Tutorial/Page';
import Router from './Router';

const WithProvider = () => {
  const { loading, user, onSaveWhenNotLogin } = useUser();
  if (loading) {
    return null;
  }

  if (!user.id) {
    return <Tutorial onPress={onSaveWhenNotLogin} />;
  }

  return <Router />;
};

export default WithProvider;
