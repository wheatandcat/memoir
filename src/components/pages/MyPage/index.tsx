import React from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import theme from 'config/theme';
import Login from 'components/pages/Login';
import UpdateProfile from 'components/pages/UpdateProfile';
import SettingAddShareUser from 'components/pages/Setting/AddShareUser';
import SettingRelationshipRequests from 'components/pages/Setting/RelationshipRequests';
import SettingAcceptedRelationship from 'components/pages/Setting/AcceptedRelationship';
import useSentryBreadcrumb from 'hooks/useSentryBreadcrumb';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyPage'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'MyPage'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const MyPage: React.FC<Props> = () => {
  useSentryBreadcrumb();

  return <Connected />;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyPage">
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
    </Stack.Navigator>
  );
};

const MyPageScreenOption = (title: string) => {
  return {
    title,
    headerStyle: {
      backgroundColor: theme().color.primary.main,
    },
    headerBackTitleVisible: false,
    headerTintColor: theme().color.secondary.main,
  };
};

export default RootStack;
