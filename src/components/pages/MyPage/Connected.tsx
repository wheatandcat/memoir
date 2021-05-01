import React, { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import TemplateMyPage from 'components/templates/MyPage/Page';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { useRecoilValue } from 'recoil';
import { authUserState } from 'store/atoms';

type Props = {};

export type ConnectedType = {};

const Connected: React.FC<Props> = () => {
  const { setup, onLogout } = useFirebaseAuth();
  const authUser = useRecoilValue(authUserState);
  const navigation = useNavigation();

  const onLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  if (!setup) {
    return null;
  }

  return (
    <TemplateMyPage
      authenticated={!!authUser.uid}
      onLogout={onLogout}
      onLogin={onLogin}
    />
  );
};

export default memo(Connected);
