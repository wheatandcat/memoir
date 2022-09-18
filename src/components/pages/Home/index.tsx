import React, { useState, useCallback, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useSentryBreadcrumb from 'hooks/useSentryBreadcrumb';
import IconButton from 'components/molecules/IconButton';
import View from 'components/atoms/View';
import theme from 'config/theme';
import Connected from './Connected';

export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

type State = {
  openSettingModal: boolean;
};

const initialState = (): State => ({
  openSettingModal: false,
});

export const Home: React.FC<Props> = (props) => {
  useSentryBreadcrumb();
  const [state, setState] = useState<State>(initialState());

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View pr={2} pb={1}>
          <IconButton
            name="more-vert"
            size="base"
            onPress={() => setState((v) => ({ ...v, openSettingModal: true }))}
          />
        </View>
      ),
    });
  }, [props.navigation]);

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
      {...props}
      openSettingModal={state.openSettingModal}
      onCloseSettingModal={() =>
        setState((v) => ({ ...v, openSettingModal: false }))
      }
    />
  );
};

export const HomeScreenOption = (title: string = '') => {
  return {
    title,
    headerStyle: {
      backgroundColor: theme().color.primary.main,
    },
    headerBackTitleVisible: false,
    headerTintColor: theme().color.secondary.main,
  };
};

export default Home;
