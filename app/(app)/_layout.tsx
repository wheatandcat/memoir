import FocusAwareStatusBar from "@/components/layouts/FocusAwareStatusBar";
import theme from "@/config/theme";
import { useSession } from "@/ctx";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { View } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FocusAwareStatusBar
        backgroundColor="transparent"
        style="light"
        translucent
      />
      <Stack
        screenOptions={{
          headerShown: true,
          title: "",
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: theme().color.primary.main,
          },
          headerTintColor: theme().fontColors.secondary,
        }}
      >
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
