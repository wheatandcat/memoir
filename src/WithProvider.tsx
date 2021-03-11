import React from 'react';
import useUser from 'hooks/useUser';
import Router from './Router';

const WithProvider = () => {
  const { user } = useUser();

  if (!user.id) {
    return null;
  }

  return <Router />;
};

export default WithProvider;
