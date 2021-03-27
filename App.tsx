import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import App from './src/App';

const AppContainer = () => {
  let [fontsLoaded] = useFonts({
    'RobotoCondensed-Bold': require('./assets/RobotoCondensed-Bold.ttf'),
    'NotoSansJP-Bold': require('./assets/NotoSansJP-Bold.otf'),
    'TrainOne-Regular': require('./assets/TrainOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <App />;
};

export default AppContainer;
