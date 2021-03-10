import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home, { HomeScreenOption } from 'components/pages/Home';
import Memoir from 'components/pages/Memoir';
import SettingLicence from 'components/pages/Setting/Licence';
import theme from 'config/theme';

const Stack = createStackNavigator();

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

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" mode="modal">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Memoir"
          component={Memoir}
          options={HomeScreenOption()}
        />
        <Stack.Screen
          name="SettingLicence"
          component={SettingLicence}
          options={HomeScreenOption()}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
