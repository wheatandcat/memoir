import { useState, useCallback } from 'react';
import Page from '@/features/top/components/Connected';
import useUser from '@/hooks/useUser';
import * as Font from 'expo-font';
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import { NotoSansJP_700Bold } from '@expo-google-fonts/noto-sans-jp';

export default function SignIn() {
  const { user, onSaveWhenNotLogin } = useUser();
  const [create, setCreate] = useState(false);

  const onSkip = useCallback(() => {
    setCreate(true);
    onSaveWhenNotLogin();
  }, [onSaveWhenNotLogin]);

  const [fontsLoaded] = Font.useFonts({
    'RobotoCondensed-Bold': RobotoCondensed_700Bold,
    'NotoSansJP-Bold': NotoSansJP_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Page
      onSkip={onSkip}
      setCreate={setCreate}
      create={create}
      isExistUser={!!user.id}
    />
  );
}
