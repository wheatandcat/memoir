import React, { memo, useEffect, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authUserState, homeItemsState } from 'store/atoms';
import TemplateTop from 'components/templates/Top/Page';

export type Props = {
  onSkip: () => void;
};

export type ConnectedType = {
  onSkip: () => void;
  onLogin: () => void;
  onCreate: () => void;
};

const Connected: React.FC<Props> = (props) => {
  const { setup, onAppleLogin, onGoogleLogin } = useFirebaseAuth();
  const setHomeItemsState = useSetRecoilState(homeItemsState);
  const authUser = useRecoilValue(authUserState);
  const authenticated = !!authUser.uid;
  const login = useRef(false);

  const onLogin = useCallback(() => {
    login.current = true;

    if (Platform.OS === 'ios') {
      onAppleLogin();
    } else {
      onGoogleLogin();
    }
  }, [onAppleLogin, onGoogleLogin]);

  const onCreate = useCallback(() => {
    login.current = false;
  }, []);

  const onSkip = useCallback(() => {
    setHomeItemsState({ items: [] });
    props.onSkip();
  }, [props, setHomeItemsState]);

  useEffect(() => {
    if (authenticated) {
      if (login.current) {
      } else {
      }
    }
  }, [authenticated]);

  if (!setup) {
    return null;
  }

  return (
    <TemplateTop
      onLogin={onLogin}
      onCreate={onCreate}
      onAppleLogin={onAppleLogin}
      onGoogleLogin={onGoogleLogin}
      onSkip={onSkip}
    />
  );
};

export default memo(Connected);
