import { useCallback, useEffect, useState } from "react";
import "react-native-get-random-values";
import usePrevious from "@/hooks/usePrevious";
import { setItem, storageKey } from "@/lib/storage";
import { CreateUserDocument, UserDocument } from "@/queries/api/index";
import { useUserStore } from "@/store/userStore";
import { useLazyQuery, useMutation } from "@apollo/client";
import * as Sentry from "@sentry/react-native";
import { v4 as uuidv4 } from "uuid";

const useUser = () => {
  const [setupUser, setSetupUser] = useState(false);
  const { loading, uid, user, setUser, initializeUser } = useUserStore();

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  useEffect(() => {
    if (user.id) {
      // userの設定が完了した際にsetupを完了にする
      setSetupUser(true);
    }
  }, [user.id]);

  const [getUser] = useLazyQuery(UserDocument, {
    onCompleted: (data) => {
      setUser({
        ...user,
        id: data?.user?.id || "",
        userID: data?.user?.id || "",
        displayName: data?.user?.displayName || "",
        image: data?.user?.image || "",
      });
    },
  });

  const prevUserID = usePrevious(user.id);

  const [createUserMutation] = useMutation(CreateUserDocument, {
    async onCompleted({ createUser }) {
      await setItem(storageKey.USER_ID_KEY, createUser.id);
      setUser({ id: createUser.id, userID: "", displayName: "", image: "" });
    },
  });

  const onSaveWhenNotLogin = useCallback(() => {
    // ログインせずにチュートリアルを超えた場合は、こちらから保存
    const u = uuidv4();

    const variables = {
      input: {
        id: u,
      },
    };

    createUserMutation({ variables });
  }, [createUserMutation]);

  const setup = useCallback(() => {
    if (setupUser) {
      return;
    }

    if (!user.id && !uid) {
      setSetupUser(true);
      return;
    }

    getUser();
  }, [getUser, uid, user.id, setupUser]);

  useEffect(() => {
    if (!loading) {
      setup();
    }
  }, [loading, setup]);

  useEffect(() => {
    if (user.id) {
      if (user.id !== prevUserID) {
        Sentry.setUser({
          id: user.id,
        });
      }
    }
  }, [user.id, prevUserID]);

  return {
    user,
    setupUser,
    onSaveWhenNotLogin,
  };
};

export default useUser;
