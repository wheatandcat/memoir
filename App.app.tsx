import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import { NotoSansJP_700Bold } from '@expo-google-fonts/noto-sans-jp';
import { LogBox } from 'react-native';
import App from './src/App';

/*
import { storageKey, removeItem } from 'lib/storage';
removeItem(storageKey.USER_ID_KEY);
removeItem(storageKey.AUTH_UID_KEY);
removeItem(storageKey.AUTH_ID_TOKEN_KEY);
removeItem(storageKey.AUTH_ID_TOKEN_EXPIRATION_KEY);
*/

LogBox.ignoreLogs([
  'Setting a timer',
  'Constants.deviceYearClass has been deprecated',
  'AsyncStorage has been extracted',
]);

const AppContainer = () => {
  let [fontsLoaded] = useFonts({
    'RobotoCondensed-Bold': RobotoCondensed_700Bold,
    'NotoSansJP-Bold': NotoSansJP_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <App />;
};

export default AppContainer;
