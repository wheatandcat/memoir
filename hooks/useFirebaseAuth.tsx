import { useSession } from "@/ctx";
import Auth from "@/lib/auth";
import { getFirebaseAuthApp } from "@/lib/firebase";
import { getItem, removeItem, setItem, storageKey } from "@/lib/storage";
import {
  CreateAuthUserDocument,
  ExistAuthUserDocument,
  UserDocument,
} from "@/queries/api/index";
import type { CreateAuthUserMutationVariables } from "@/queries/api/index";
import { authUserState, userState } from "@/store/atoms";
import { existAuthUserID } from "@/store/selectors";
import { useLazyQuery, useMutation } from "@apollo/client";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import * as WebBrowser from "expo-web-browser";
import {
  OAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import type { OAuthCredential } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { v4 as uuidv4 } from "uuid";

const auth = new Auth();
const appAuth = getFirebaseAuthApp();

WebBrowser.maybeCompleteAuthSession();

const nonceGen = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export type UseFirebaseAuth = ReturnType<typeof useFirebaseAuth>;

const useFirebaseAuth = (login = false, errorCallback?: () => void) => {
  const { signOut } = useSession();
  const [setup, setSetup] = useState(false);
  const authUserID = useRecoilValueLoadable(existAuthUserID);
  const [authUser, setAuthUser] = useRecoilState(authUserState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user.id) {
      // Auth認証後にuserの設定が完了した際にsetupを完了にする
      setSetup(true);
    }
  }, [user.id]);

  const [getUser, userQuery] = useLazyQuery(UserDocument, {
    onCompleted: (data) => {
      setItem(storageKey.AUTHENTICATED_USER_ID_KEY, data?.user?.id);
      setUser((s) => ({
        ...s,
        id: data?.user?.id || "",
        userID: data?.user?.id || "",
        displayName: data?.user?.displayName || "",
        image: data?.user?.image || "",
      }));
    },
  });

  const [createAuthUserMutation] = useMutation(CreateAuthUserDocument, {
    async onCompleted(data) {
      const id = data.createAuthUser.id;

      setUser({
        id,
        userID: "",
        displayName: "",
        image: "",
      });

      setSetup(true);
    },
    async onError() {
      // エラーになった場合はログアウトさせる
      Alert.alert("エラー", "ログインに失敗した");
      onLogout();
    },
  });

  const [getExistAuthUser, existAuthUserQuery] = useLazyQuery(
    ExistAuthUserDocument,
    {
      onCompleted: (data) => {
        if (data.existAuthUser.exist === false) {
          const u = uuidv4();
          const variables: CreateAuthUserMutationVariables = {
            input: {
              id: u,
              isNewUser: true,
            },
          };

          createAuthUserMutation({
            variables,
          });
        } else {
          // ユーザー情報を設定
          getUser();
        }
      },
    },
  );

  const onGoogleLogin = useCallback(() => {}, []);

  const setSession = useCallback(
    async (refresh = false) => {
      const idToken = await auth.setSession(refresh);
      const auid = await getItem(storageKey.AUTHENTICATED_USER_ID_KEY);
      if (auid) {
        getUser();
      } else {
        getExistAuthUser();
      }

      if (idToken) {
        const authUID = await getItem(storageKey.AUTH_UID_KEY);
        setAuthUser({
          uid: authUID,
        });
      }

      return idToken;
    },
    [setAuthUser, getUser, getExistAuthUser],
  );

  const firebaseLogin = useCallback(
    async (credential: OAuthCredential) => {
      const data = await signInWithCredential(appAuth, credential).catch(
        (error: any) => {
          console.log("error:", error);
        },
      );

      console.log("data:", data);

      const ok = await setSession(true);

      return ok;
    },
    [setSession],
  );

  const onAppleLogin = useCallback(async () => {
    const nonce = nonceGen(32);
    const digestedNonce = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      nonce,
    );

    try {
      const result = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: digestedNonce,
      });
      const provider = new OAuthProvider("apple.com");
      const credential = provider.credential({
        idToken: result.identityToken || "",
        rawNonce: nonce,
      });

      firebaseLogin(credential);
    } catch (e) {
      console.log("error:", e);
      Alert.alert("ログインに失敗しました");
      errorCallback?.();
    }
  }, [firebaseLogin, errorCallback]);

  const onLogout = useCallback(async () => {
    await auth.logout();
    await removeItem(storageKey.AUTHENTICATED_USER_ID_KEY);
    await removeItem(storageKey.USER_ID_KEY);

    setAuthUser({
      uid: null,
    });
    setUser({ id: null, userID: "", displayName: "", image: "" });

    userQuery.client?.clearStore();
    existAuthUserQuery.client?.clearStore();
    signOut();
  }, [
    setAuthUser,
    setUser,
    userQuery.client,
    existAuthUserQuery.client,
    signOut,
  ]);

  useEffect(() => {
    if (authUser.uid) {
      return;
    }
    if (authUserID.state === "hasValue") {
      if (authUserID.contents) {
        setAuthUser({ uid: authUserID.contents });
      }
    }
  }, [authUserID, setAuthUser, authUser.uid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (aUser) => {
      if (aUser) {
        setSession(true);
      } else {
        if (!login) {
          // ログアウトした時
          setAuthUser({
            uid: null,
          });
          setUser({ id: null, userID: "", displayName: "", image: "" });
        }

        setSetup(true);
      }
    });

    return () => unsubscribe();
  }, [setUser, setAuthUser, setSession, login]);

  return {
    setupAuth: setup,
    onAppleLogin,
    onGoogleLogin,
    onLogout,
  };
};

export default useFirebaseAuth;
