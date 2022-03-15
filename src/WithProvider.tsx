import React, { useState, useCallback } from 'react';
import useUser from 'hooks/useUser';
import Top from 'components/pages/Top/Connected';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import Router from './Router';
//import { storageKey, removeItem } from 'lib/storage';

const WithProvider = () => {
  useFirebaseAuth();
  const { loading, user, onSaveWhenNotLogin } = useUser();
  const [create, setCreate] = useState(false);

  /*
  removeItem(storageKey.USER_ID_KEY);
  removeItem(storageKey.AUTH_UID_KEY);
  removeItem(storageKey.AUTH_ID_TOKEN_KEY);
  removeItem(storageKey.AUTH_ID_TOKEN_EXPIRATION_KEY);
  */

  const onSkip = useCallback(() => {
    setCreate(true);
    onSaveWhenNotLogin();
  }, [onSaveWhenNotLogin]);

  if (loading) {
    return null;
  }

  if (!user.id || create) {
    return (
      <Top
        onSkip={onSkip}
        setCreate={setCreate}
        create={create}
        isExistUser={!!user.id}
      />
    );
  }

  return <Router />;
};

export default WithProvider;
