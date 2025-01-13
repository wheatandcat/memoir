import Page from "@/features/myPage/updateProfile/components";
import theme from "config/theme";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "プロフィール",
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
