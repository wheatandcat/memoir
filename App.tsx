import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import { NotoSansJP_700Bold } from '@expo-google-fonts/noto-sans-jp';
import App from './src/App';

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
