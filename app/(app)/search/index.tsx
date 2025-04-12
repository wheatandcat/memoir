import theme from "@/config/theme";
import Page from "@/features/search/components";
import { Stack } from "expo-router";
import React from "react";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "検索条件を設定",
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
