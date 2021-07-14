import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import Home, { HomeScreenOption } from 'components/pages/Home';
import Memoir from 'components/pages/Memoir';
import SettingLicence from 'components/pages/Setting/Licence';
import SettingMemoir from 'components/pages/Setting/Memoir';
import MyPage from 'components/pages/MyPage';
import theme from 'config/theme';

const Stack = createStackNavigator();
const prefix = Linking.createURL('/');

export const HomeOption = () => {
  return {
    title: '',
    headerStyle: {
      backgroundColor: theme().color.primary.main,
    },
    headerBackTitleVisible: false,
    headerTintColor: theme().color.secondary.main,
  };
};

const WithProvider = () => {
  return (
    <NavigationContainer
      linking={{
        prefixes: [prefix],
        subscribe(listener) {
          const onReceiveURL = ({ url }: { url: string }) => {
            listener(url);
          };

          Linking.addEventListener('url', onReceiveURL);

          const subscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
              const url =
                response.notification.request.content.data?.urlScheme ?? '';

              if (url !== '') {
                listener(`${prefix}${url}`);
              }
            }
          );

          return () => {
            Linking.removeEventListener('url', onReceiveURL);
            subscription.remove();
          };
        },
      }}
    >
      <Stack.Navigator initialRouteName="Home" mode="modal">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Memoir"
          component={Memoir}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingLicence"
          component={SettingLicence}
          options={HomeScreenOption()}
        />
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingMemoir"
          component={SettingMemoir}
          options={HomeScreenOption('振り返り通知設定')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WithProvider;
