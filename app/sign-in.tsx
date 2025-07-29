import Page from "@/features/top/components/Connected";
import useUser from "@/hooks/useUser";
import { NotoSansJP_700Bold } from "@expo-google-fonts/noto-sans-jp";
import { RobotoCondensed_700Bold } from "@expo-google-fonts/roboto-condensed";
import * as Font from "expo-font";
import { SplashScreen } from "expo-router";
import { useCallback, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function SignIn() {
  const { user, onSaveWhenNotLogin } = useUser();
  const [create, setCreate] = useState(false);

  const onSkip = useCallback(() => {
    setCreate(true);
    onSaveWhenNotLogin();
  }, [onSaveWhenNotLogin]);

  const [fontsLoaded] = Font.useFonts({
    "RobotoCondensed-Bold": RobotoCondensed_700Bold,
    "NotoSansJP-Bold": NotoSansJP_700Bold,
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
