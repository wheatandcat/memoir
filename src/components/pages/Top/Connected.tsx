import React, { memo, useCallback, useState } from 'react';
import { Platform } from 'react-native';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { useSetRecoilState } from 'recoil';
import { homeItemsState } from 'store/atoms';
import TemplateTop from 'components/templates/Top/Page';
import Intro from 'components/pages/Intro/Intro';
import { homeState } from 'store/atoms';

export type Props = {
  onSkip: () => void;
  setCreate: (create: boolean) => void;
  create: boolean;
  isExistUser: boolean;
};

export type ConnectedType = {
  loading: boolean;
  onSkip: () => void;
  onLogin: () => void;
};

const Connected: React.FC<Props> = (props) => {
  const setHomeState = useSetRecoilState(homeState);
  const [loading, setLoading] = useState(false);

  const { setupAuth, onAppleLogin, onGoogleLogin } = useFirebaseAuth(
    false,
    () => {
      setLoading(false);
      props.setCreate(false);
    }
  );

  const setHomeItemsState = useSetRecoilState(homeItemsState);

  const onLogin = useCallback(() => {
    setLoading(true);

    if (Platform.OS === 'ios') {
      onAppleLogin();
    } else {
      onGoogleLogin();
    }
  }, [onAppleLogin, onGoogleLogin]);

  const onSkip = useCallback(() => {
    setHomeItemsState({ items: [] });
    props.onSkip();
  }, [props, setHomeItemsState]);

  const onFinish = useCallback(() => {
    setHomeState({
      openAddItemModal: true,
    });

    props.setCreate(false);
  }, [setHomeState, props]);

  if (!setupAuth) {
    return null;
  }

  if (props.create && props.isExistUser) {
    return <Intro onFinish={onFinish} />;
  }

  return (
    <TemplateTop
      loading={loading}
      onLogin={onLogin}
      onAppleLogin={async () => {
        props.setCreate(true);
        setLoading(true);
        await onAppleLogin();
      }}
      onGoogleLogin={async () => {
        props.setCreate(true);
        setLoading(true);
        await onGoogleLogin();
      }}
      onSkip={onSkip}
    />
  );
};

export default memo(Connected);
