import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import Home, { HomeScreenOption } from 'components/pages/Home';
import Memoir from 'components/pages/Memoir';
import SettingLicence from 'components/pages/Setting/Licence';
import SettingMemoir from 'components/pages/Setting/Memoir';
import MemoirScreenShot from 'components/pages/Memoir/ScreenShot';
import MyPage, { MyPageScreenOption } from 'components/pages/MyPage';
import { RootStackParamList } from 'lib/navigation';
import ItemDetail from 'components/pages/ItemDetail';
import Login from 'components/pages/Login';
import UpdateProfile from 'components/pages/UpdateProfile';
import SettingAddShareUser from 'components/pages/Setting/AddShareUser';
import SettingRelationshipRequests from 'components/pages/Setting/RelationshipRequests';
import SettingAcceptedRelationship from 'components/pages/Setting/AcceptedRelationship';
import Search from 'components/pages/Search';

const Stack = createStackNavigator<RootStackParamList>();
const prefix = Linking.createURL('/');

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

          const subscription =
            Notifications.addNotificationResponseReceivedListener(
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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={HomeScreenOption()}
        />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetail}
          options={HomeScreenOption()}
        />
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={MyPageScreenOption('マイページ')}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={MyPageScreenOption('サインイン')}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={MyPageScreenOption('プロフィール編集')}
        />
        <Stack.Screen
          name="SettingAddShareUser"
          component={SettingAddShareUser}
          options={MyPageScreenOption('共有メンバー追加')}
        />
        <Stack.Screen
          name="SettingRelationshipRequests"
          component={SettingRelationshipRequests}
          options={MyPageScreenOption('共有メンバー申請')}
        />
        <Stack.Screen
          name="SettingAcceptedRelationship"
          component={SettingAcceptedRelationship}
          options={MyPageScreenOption('')}
        />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="Search"
            component={Search}
            options={MyPageScreenOption('検索条件を設定')}
          />
          <Stack.Screen
            name="Memoir"
            component={Memoir}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MemoirScreenShot"
            component={MemoirScreenShot}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingLicence"
            component={SettingLicence}
            options={HomeScreenOption()}
          />
          <Stack.Screen
            name="SettingMemoir"
            component={SettingMemoir}
            options={HomeScreenOption('振り返り通知設定')}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WithProvider;
