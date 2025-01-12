import  { type FC,memo, useCallback, useState } from 'react';
import { Platform } from 'react-native';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { useSetRecoilState } from 'recoil';
import { homeItemsState,homeState } from 'store/atoms';
import Intro from '@/features/top/intro/components/index';
import { useSession } from '@/ctx';
import { router } from 'expo-router';
import Page from './Page';

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

const Connected: FC<Props> = (props) => {
  const { signIn } = useSession();
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

    signIn();
    router.replace('/');
  }, [setHomeState, signIn]);

  if (!setupAuth) {
    return null;
  }

  if (props.create && props.isExistUser) {
    return <Intro onFinish={onFinish} />;
  }

  return (
    <Page
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
