import { useSession } from "@/ctx";
import Intro from "@/features/top/intro/components/index";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { useHomeItemsStore } from "@/store/homeItemsStore";
import { useHomeStateStore } from "@/store/homeStateStore";
import { router } from "expo-router";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { Platform } from "react-native";
import Page from "./Page";

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
  const setHomeState = useHomeStateStore((state) => state.setOpenAddItemModal);
  const [loading, setLoading] = useState(false);

  const { setupAuth, onAppleLogin, onGoogleLogin } = useFirebaseAuth(
    false,
    () => {
      setLoading(false);
      props.setCreate(false);
    },
  );

  const setHomeItemsState = useHomeItemsStore((state) => state.setHomeItems);

  const onLogin = useCallback(async () => {
    setLoading(true);

    if (Platform.OS === "ios") {
      await onAppleLogin();
    } else {
      await onGoogleLogin();
    }
    signIn();
    router.replace("/");
  }, [onAppleLogin, onGoogleLogin, signIn]);

  const onSkip = useCallback(() => {
    setHomeItemsState([]);
    props.onSkip();
  }, [props, setHomeItemsState]);

  const onFinish = useCallback(() => {
    setHomeState(true);

    signIn();
    router.replace("/");
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
