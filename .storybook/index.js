import { getStorybookUI } from '@storybook/react-native';
import * as Font from 'expo-font';
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import { NotoSansJP_700Bold } from '@expo-google-fonts/noto-sans-jp';
import './storybook.requires';

Font.loadAsync({
  'RobotoCondensed-Bold': RobotoCondensed_700Bold,
  'NotoSansJP-Bold': NotoSansJP_700Bold,
});

const StorybookUIRoot = getStorybookUI({
  enableWebsockets: true,
  onDeviceUI: false,
});

export default StorybookUIRoot;
