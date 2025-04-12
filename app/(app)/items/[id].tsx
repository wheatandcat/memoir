import theme from "@/config/theme";
import Page from "@/features/items/components";
import { Stack } from "expo-router";
import React from "react";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
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
