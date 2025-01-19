import theme from "@/config/theme";
import Page from "@/features/setting/addShareUser/components";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "共有メンバー追加",
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: theme().color.primary.main,
          },
          headerTintColor: theme().fontColors.secondary,
        }}
      />
      <Page />
    </>
  );
}
