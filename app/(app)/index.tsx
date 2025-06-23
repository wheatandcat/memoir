import View from "@/components/elements/View";
import IconButton from "@/components/layouts/IconButton";
import theme from "@/config/theme";
import Home from "@/features/home/components";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { NotoSansJP_700Bold } from "@expo-google-fonts/noto-sans-jp";
import { RobotoCondensed_700Bold } from "@expo-google-fonts/roboto-condensed";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import React, { useState } from "react";

export default function Index() {
  const { setupAuth } = useFirebaseAuth(true);
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const [fontsLoaded] = Font.useFonts({
    "RobotoCondensed-Bold": RobotoCondensed_700Bold,
    "NotoSansJP-Bold": NotoSansJP_700Bold,
  });

  if (!fontsLoaded || !setupAuth) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: theme().color.primary.main,
          },
          headerRight: () => (
            <View
              pr={0}
              pb={0}
              style={{
                width: 30,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                left: 0,
                top: 0,
              }}
            >
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
