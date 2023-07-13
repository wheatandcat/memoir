import React, { useEffect, useState, useCallback } from 'react';
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

const AppContainer = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'RobotoCondensed-Bold': RobotoCondensed_700Bold,
          'NotoSansJP-Bold': NotoSansJP_700Bold,
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();

    return () => {};
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.root} onLayout={onLayoutRootView}>
      <App />
    </View>
  );
};

let AppEntryPoint = AppContainer;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoint = require('./.storybook').default;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default AppEntryPoint;
