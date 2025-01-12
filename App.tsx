import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import { NotoSansJP_700Bold } from '@expo-google-fonts/noto-sans-jp';
import { LogBox } from 'react-native';
import Constants from 'expo-constants';
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
  "exported from 'deprecated-react-native-prop-types'.",
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

SplashScreen.preventAutoHideAsync();

const AppContainer = () => {
  const [fontsLoaded] = Font.useFonts({
    'RobotoCondensed-Bold': RobotoCondensed_700Bold,
    'NotoSansJP-Bold': NotoSansJP_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.root}>
      <App />
    </View>
  );
};

let AppEntryPoint = AppContainer;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  SplashScreen.hideAsync();
  AppEntryPoint = require('./.storybook').default;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default AppEntryPoint;
