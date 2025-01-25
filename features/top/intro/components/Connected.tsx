import { useNotification } from "@/containers/Notification";
import useMemoirNotificationSetting from "@/hooks/useMemoirNotificationSetting";
import * as Notifications from "expo-notifications";
import type { FC } from "react";
import { memo, useCallback } from "react";
import Plain from "./Plain";
import type { Input } from "./type";

type Props = {
  onFinish: () => void;
};

const Connected: FC<Props> = (props) => {
  const memoirNotificationSetting = useMemoirNotificationSetting();
  const { onPermissionRequest } = useNotification();

  const onSaveNotification = useCallback(
    async (input: Input, callback: () => void) => {
      if (input.notification) {
        if (!onPermissionRequest) {
          return;
        }

        const ok = await onPermissionRequest(() => null);
        if (ok) {
          //await Notifications.cancelAllScheduledNotificationsAsync();

          const trigger: Notifications.CalendarTriggerInput = {
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
            repeats: true,
            hour: input.hours,
            minute: input.minutes,
            weekday: input.dayOfWeek,
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
        Notifications.cancelAllScheduledNotificationsAsync();
      }

      memoirNotificationSetting.onSave(input);
      callback();
    },
    [memoirNotificationSetting, onPermissionRequest],
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
      onSaveNotification={onSaveNotification}
      onFinish={props.onFinish}
    />
  );
};

export default memo(Connected);
