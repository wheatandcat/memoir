import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "config/theme";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import type React from "react";
import { memo, useCallback, useState } from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";
import { userState } from "store/atoms";
import Page from "./Page";

const url = Constants.expoConfig?.extra?.INQUIRY_API || "";

type Request = {
  body: string;
  name: string;
  email: string;
  env: string;
  userID: string;
  device: string;
  category: string;
};

const Connected: React.FC = () => {
  const user = useRecoilValue(userState);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);
  const [text, setText] = useState("");

  const onContact = useCallback(async () => {
    if (text.length === 0) {
      Alert.alert("コメントが入力されていません");
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    const req: Request = {
      body: text,
      name: user.displayName || "無名",
      email: "foobazbar@gmail.com",
      userID: user.userID || "無し",
      env: "アプリ",
      device: `${Platform.OS}/${Platform.Version}/${Device.modelName}/${String(
        Device.osInternalBuildId,
      )}`,
      category: "フィードバックを送信",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      setLoading(false);
      Alert.alert("送信に失敗しました");
      return;
    }

    setSend(true);
  }, [user, text, loading]);

  const onClose = useCallback(() => {
    setSend(false);
    router.back();
  }, [router]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "フィードバックを送信",
          headerStyle: {
            backgroundColor: theme().color.primary.main,
          },
          headerRight: () => (
            <View pr={2} mr={1}>
              <TouchableOpacity onPress={onContact}>
                <Text>送信</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Page
        send={send}
        userID={user.id ?? ""}
        loading={loading}
        onContact={onContact}
        text={text}
        onChangeText={setText}
        onClose={onClose}
      />
    </>
  );
};

export default memo(Connected);
