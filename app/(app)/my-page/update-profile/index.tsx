import theme from "@/config/theme";
import Page from "@/features/myPage/updateProfile/components";
import { Stack } from "expo-router";
import React from "react";

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
