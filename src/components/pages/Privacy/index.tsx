import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Privacy'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Privacy'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Privacy: React.FC<Props> = () => {
  return (
    <WebView
      style={styles.root}
      source={{ uri: 'https://memoir-app.dev/privacy/app' }}
    />
  );
};

export default memo(Privacy);

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});
