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
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyPage'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'MyPage'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const MyPage: React.FC<Props> = () => {
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
    </Stack.Navigator>
  );
};

export const MyPageScreenOption = (title: string) => {
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
