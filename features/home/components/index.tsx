import useSentryBreadcrumb from "@/hooks/useSentryBreadcrumb";
import * as Notifications from "expo-notifications";
import { type FC, memo, useCallback, useEffect } from "react";
import Connected from "./Connected";

type Props = {
  openSettingModal: boolean;
  onCloseSettingModal: () => void;
};

export const Home: FC<Props> = (props) => {
  useSentryBreadcrumb();

  const checkLocalNotification = useCallback(async () => {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync();

    if (notifications.length > 1) {
      // ローカルPushが複数存在する場合は削除
      const ids = notifications
        .map((v) => v.identifier)
        .splice(0, notifications.length - 1);

      for (const id of ids) {
        await Notifications.cancelScheduledNotificationAsync(id);
      }
    }
  }, []);

  useEffect(() => {
    checkLocalNotification();
  }, [checkLocalNotification]);

  return (
    <Connected
      openSettingModal={props.openSettingModal}
      onCloseSettingModal={props.onCloseSettingModal}
    />
  );
};

export default memo(Home);
