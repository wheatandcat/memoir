import theme from "@/config/theme";
import Page from "@/features/myPage/components";
import { Stack } from "expo-router";
import React from "react";
export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "マイページ",
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
