import React, { memo, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import TemplateLogin from 'components/templates/Login/Page';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { useRecoilValue } from 'recoil';
import { authUserState } from 'store/atoms';

type Props = {};

export type ConnectedType = {};

const Connected: React.FC<Props> = () => {
  const { setup, onAppleLogin, onGoogleLogin } = useFirebaseAuth();
  const authUser = useRecoilValue(authUserState);
  const authenticated = !!authUser.uid;
  const navigation = useNavigation();

  useEffect(() => {
    if (authenticated) {
      navigation.goBack();
    }
  }, [authenticated, navigation]);

  if (!setup) {
    return null;
  }

  return (
    <TemplateLogin onAppleLogin={onAppleLogin} onGoogleLogin={onGoogleLogin} />
  );
};

export default memo(Connected);
