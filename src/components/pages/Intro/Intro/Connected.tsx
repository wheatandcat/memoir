import React, { memo, useCallback, useState } from 'react';
import * as Notifications from 'expo-notifications';
import useMemoirNotificationSetting from 'hooks/useMemoirNotificationSetting';
import { useNotification } from 'containers/Notification';
import Plain from './Plain';

export type Props = {
  onFinish: () => void;
};

export type ConnectedType = {
  step: number;
  onSaveNotification: (input: Input, callback: () => void) => void;
  onStep: (num: number) => void;
};

type Input = {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
};

const Connected: React.FC<Props> = () => {
  const memoirNotificationSetting = useMemoirNotificationSetting();
  const { onPermissionRequest } = useNotification();

  const [step, setStep] = useState(0);

  const onStep = useCallback((num: number) => {
    setStep(num);
  }, []);

  const onSaveNotification = useCallback(
    async (input: Input, callback: () => void) => {
      if (input.notification) {
        if (!onPermissionRequest) {
          return;
        }

        onPermissionRequest(() => {
          Notifications.scheduleNotificationAsync({
            content: {
              body: 'ふりかえりの時間になりました',
              data: {
                urlScheme: 'Memoir',
              },
            },
            trigger: {
              hour: input.hours,
              minute: input.minutes,
              weekday: input.dayOfWeek,
              repeats: true,
            },
          });
        });

        // NOTE: API出力
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
      step={step}
      onStep={onStep}
    />
  );
};

export default memo(Connected);
