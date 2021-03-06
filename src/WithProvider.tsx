import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home, { HomeScreenOption } from 'components/pages/Home';
import Memoir from 'components/pages/Memoir';
import SettingLicence from 'components/pages/Setting/Licence';
import theme from 'config/theme';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { existUserID } from 'store/selectors';
import { v4 as uuidv4 } from 'uuid';
import { userState } from 'store/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

type State = {
  setup: boolean;
};

const initialState = (): State => ({
  setup: false,
});

const WithProvider = () => {
  const [state, setState] = useState<State>(initialState());
  const setUser = useSetRecoilState(userState);

  const userID = useRecoilValueLoadable(existUserID);

  const setup = useCallback(
    (id: string) => {
      setUser({ id });
      setState((s) => ({ ...s, setup: true }));
    },
    [setUser]
  );

  const initUser = useCallback(async () => {
    const u = uuidv4();
    await AsyncStorage.setItem('USER_ID', u);

    setup(u);
  }, [setup]);

  useEffect(() => {
    if (userID.state === 'hasValue') {
      if (userID.contents) {
        setup(userID.contents);
      } else {
        // ユーザーIDを設定する
        initUser();
      }
    }
  }, [userID, initUser, setup]);

  if (!state.setup) {
    return null;
  }

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

export default WithProvider;
