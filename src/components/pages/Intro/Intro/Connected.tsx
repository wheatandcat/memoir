import React, { memo, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import useMemoirNotificationSetting from 'hooks/useMemoirNotificationSetting';
import { useNotification } from 'containers/Notification';
import Plain from './Plain';

export type Props = {
  onFinish: () => void;
};

export type ConnectedType = {
  onSaveNotification: (input: Input, callback: () => void) => void;
  onFinish: () => void;
};

type Input = {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
};

const Connected: React.FC<Props> = (props) => {
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
          await Notifications.cancelAllScheduledNotificationsAsync();

          const trigger = {
            hour: input.hours,
            minute: input.minutes,
            weekday: input.dayOfWeek + 1,
            repeats: true,
          };

          try {
            await Notifications.scheduleNotificationAsync({
              content: {
                body: 'ふりかえりの時間になりました',
                data: {
                  urlScheme: 'Memoir',
                },
              },
              trigger,
            });
          } catch (e) {
            console.log('err:', e);
          }
        }
      } else {
        // 通知OFFの場合は、通知をキャンセルする
        Notifications.cancelAllScheduledNotificationsAsync();
      }

      memoirNotificationSetting.onSave(input);
      callback();
    },
    [memoirNotificationSetting, onPermissionRequest]
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
