import React, { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import TemplateMyPage from 'components/templates/MyPage/Page';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { useRecoilValue } from 'recoil';
import { authUserState } from 'store/atoms';
import { userState } from 'store/atoms';

type Props = {};

export type ConnectedType = {};

const Connected: React.FC<Props> = () => {
  const { setup, onLogout } = useFirebaseAuth();
  const authUser = useRecoilValue(authUserState);
  const user = useRecoilValue(userState);
  const navigation = useNavigation();

  const onLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const onUpdateProfile = useCallback(() => {
    navigation.navigate('UpdateProfile');
  }, [navigation]);

  if (!setup) {
    return null;
  }

  return (
    <TemplateMyPage
      authenticated={!!authUser.uid}
      user={user}
      onLogout={onLogout}
      onLogin={onLogin}
      onUpdateProfile={onUpdateProfile}
    />
  );
};

export default memo(Connected);
