import  { type FC, useState, useCallback, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import useSentryBreadcrumb from 'hooks/useSentryBreadcrumb';
import IconButton from '@/components/layouts/IconButton';
import View from '@/components/elements/View';
import { Stack } from 'expo-router';
import theme from 'config/theme';
import Connected from './Connected';

type State = {
  openSettingModal: boolean;
};

const initialState = (): State => ({
  openSettingModal: false,
});

export const Home: FC = () => {
  useSentryBreadcrumb();
  const [state, setState] = useState<State>(initialState());

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
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: theme().color.primary.main,
          },
          headerRight: () => (
            <View pr={2} pb={1}>
              <IconButton
                name="more-vert"
                size="base"
                onPress={() => setState((v) => ({ ...v, openSettingModal: true }))}
              />
            </View>
          )
        }}
      />
      <Connected
        openSettingModal={state.openSettingModal}
        onCloseSettingModal={() =>
          setState((v) => ({ ...v, openSettingModal: false }))
        }
      />
    </>
  );
};

export default Home;
