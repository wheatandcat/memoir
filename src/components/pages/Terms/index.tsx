import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Terms'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Terms'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Terms: React.FC<Props> = () => {
  return (
    <WebView
      style={styles.root}
      source={{ uri: 'https://memoir-lp.vercel.app/terms?app=true' }}
    />
  );
};

export default memo(Terms);

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});
