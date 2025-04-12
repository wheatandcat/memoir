import Page from "@/features/memoir/components";
import { Stack } from "expo-router";
import React from "react";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Page />
    </>
  );
}
