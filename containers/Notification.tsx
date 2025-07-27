import theme from "@/config/theme";
import { CreatePushTokenDocument } from "@/queries/api/index";
import type { CreatePushTokenMutationVariables } from "@/queries/api/index";
import { useMutation } from "@apollo/client";
import * as Sentry from "@sentry/react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import type React from "react";
import { createContext, memo, useCallback, useContext, useRef } from "react";
import { Alert, Platform } from "react-native";

const Context = createContext<ContextProps>({});
const { Provider } = Context;

type ContextProps = Partial<{
  onPermissionRequest: (callback: () => void) => Promise<boolean>;
}>;

type Props = {
  children: React.ReactNode;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const Notification: React.FC<Props> = memo((props) => {
  const requestCallback = useRef<() => void>(() => {});

  const [createPushTokenMutation] = useMutation(CreatePushTokenDocument, {
    onCompleted() {
      requestCallback.current();
    },
  });

  const onPermissionRequest = useCallback(
    async (callback: () => void) => {
      requestCallback.current = callback;

      if (!Device.isDevice) {
        Alert.alert("端末から実行してくだださい");
        await requestCallback.current();
        return true;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("通知許可が必要です");
        await requestCallback.current();
        return false;
      }

      const projectId = Constants?.expoConfig?.extra?.eas?.projectId;

      try {
        const token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: theme().color.primary.main,
          });
        }

        const variables: CreatePushTokenMutationVariables = {
          input: {
            token,
            deviceID: `${(Device.modelName || "").split(" ").join("")}-${String(
              Device.osInternalBuildId || ""
            )
              .split(" ")
              .join("")}`,
          },
        };

        createPushTokenMutation({
          variables,
        });

        return true;
      } catch (error) {
        Alert.alert("エラーが発生しました！");
        Sentry.captureException(error);
        return false;
      }
    },
    [createPushTokenMutation]
  );

  return <Provider value={{ onPermissionRequest }}>{props.children}</Provider>;
});

export default Notification;

export const useNotification = () => useContext(Context);
