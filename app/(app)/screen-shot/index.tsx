import theme from "@/config/theme";
import Page from "@/features/memoir/screenShot/components";
import { Stack } from "expo-router";
import React from "react";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "共有",
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: theme().color.base.main,
          },
          headerShadowVisible: false,
        }}
      />
      <Page />
    </>
  );
}
