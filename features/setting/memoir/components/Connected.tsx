import { useNotification } from "@/containers/Notification";
import useMemoirNotificationSetting from "@/hooks/useMemoirNotificationSetting";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import type React from "react";
import { memo, useCallback } from "react";
import Plain from "./Plain";
import type { Input } from "./type";
const Connected: React.FC = () => {
  const router = useRouter();
  const memoirNotificationSetting = useMemoirNotificationSetting();
  const { onPermissionRequest } = useNotification();

  const onSave = useCallback(
    async (input: Input) => {
      if (input.notification) {
        if (!onPermissionRequest) {
          return;
        }

        const ok = await onPermissionRequest(() => null);
        if (ok) {
          await Notifications.cancelAllScheduledNotificationsAsync();

          const trigger = {
            channelId: "memoir",
            hour: input.hours,
            minute: input.minutes,
            weekday: input.dayOfWeek,
            repeats: true,
          };

          try {
            await Notifications.scheduleNotificationAsync({
              content: {
                body: "ふりかえりの時間になりました",
                data: {
                  urlScheme: "Memoir",
                },
              },
              trigger,
            });
          } catch (e) {
            console.log("err:", e);
          }
        }
      } else {
        // 通知OFFの場合は、通知をキャンセルする
        await Notifications.cancelAllScheduledNotificationsAsync();
      }

      memoirNotificationSetting.onSave(input);

      router.back();
    },
    [router, memoirNotificationSetting, onPermissionRequest]
  );

  return (
    <Plain
      loading={memoirNotificationSetting.loading}
      data={{
        dayOfWeek: memoirNotificationSetting.dayOfWeek,
        hours: memoirNotificationSetting.hours,
        minutes: memoirNotificationSetting.minutes,
        notification: memoirNotificationSetting.notification,
      }}
      onSave={onSave}
    />
  );
};

export default memo(Connected);
