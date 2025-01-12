import Home from '@/features/home/components';
import { useSession } from '@/ctx';
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import { NotoSansJP_700Bold } from '@expo-google-fonts/noto-sans-jp';
import * as Font from 'expo-font';

export default function Index() {
  const { signOut } = useSession();

  const [fontsLoaded] = Font.useFonts({
    'RobotoCondensed-Bold': RobotoCondensed_700Bold,
    'NotoSansJP-Bold': NotoSansJP_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Home />;
}
