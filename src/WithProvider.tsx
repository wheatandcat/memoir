import React, { useState, useCallback } from 'react';
import useUser from 'hooks/useUser';
import Top from 'components/pages/Top/Connected';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import AppLoading from 'components/templates/App/Loading';
import { screenState } from 'store/atoms';
import { useRecoilValue } from 'recoil';
import SeeYouAgain from 'components/templates/SeeYouAgain/SeeYouAgain';
import Router from './Router';

const WithProvider2 = () => {
  const { setupAuth } = useFirebaseAuth();
  const { setupUser, user, onSaveWhenNotLogin } = useUser();
  const screenStateValue = useRecoilValue(screenState);
  const [create, setCreate] = useState(false);

  const onSkip = useCallback(() => {
    setCreate(true);
    onSaveWhenNotLogin();
  }, [onSaveWhenNotLogin]);

  if (!setupUser || !setupAuth) {
    return <AppLoading />;
  }

  if (screenStateValue.seeYouAgain) {
    return <SeeYouAgain />;
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

export default WithProvider2;
