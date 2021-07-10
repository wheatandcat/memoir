import React, { memo, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import useMemoirNotificationSetting from 'hooks/useMemoirNotificationSetting';
import Plain from './Plain';

export type Props = {};

export type ConnectedType = {
  onSave: (input: Input) => void;
};

export type Input = {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
};

const Connected: React.FC<Props> = () => {
  const navigation = useNavigation();
  const memoirNotificationSetting = useMemoirNotificationSetting();

  const onSave = useCallback(
    async (input: Input) => {
      if (input.notification) {
        const {
          status: existingStatus,
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          return false;
        }

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

        // NOTE: API出力
      } else {
        // 通知OFFの場合は、通知をキャンセルする
        Notifications.cancelAllScheduledNotificationsAsync();
      }

      memoirNotificationSetting.onSave(input);

      navigation.goBack();
    },
    [navigation, memoirNotificationSetting]
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
