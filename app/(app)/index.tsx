import View from "@/components/elements/View";
import IconButton from "@/components/layouts/IconButton";
import theme from "@/config/theme";
import { useSession } from "@/ctx";
import Home from "@/features/home/components";
import { NotoSansJP_700Bold } from "@expo-google-fonts/noto-sans-jp";
import { RobotoCondensed_700Bold } from "@expo-google-fonts/roboto-condensed";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useState } from "react";

export default function Index() {
  const { signOut } = useSession();
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const [fontsLoaded] = Font.useFonts({
    "RobotoCondensed-Bold": RobotoCondensed_700Bold,
    "NotoSansJP-Bold": NotoSansJP_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            backgroundColor: theme().color.primary.main,
          },
          headerRight: () => (
            <View pr={2} pb={1}>
              <IconButton
                name="more-vert"
                size="base"
                onPress={() => setOpenSetting(true)}
              />
            </View>
          ),
        }}
      />
      <Home
        openSettingModal={openSetting}
        onCloseSettingModal={() => setOpenSetting(false)}
      />
    </>
  );
}
