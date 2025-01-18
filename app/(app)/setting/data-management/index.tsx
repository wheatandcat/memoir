import Page from "@/features/setting/dataManagement/components";
import theme from "config/theme";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "データ管理",
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
