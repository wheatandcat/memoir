import Page from "@/features/memoir/screenShot/components";
import { Stack } from "expo-router";

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
