import FocusAwareStatusBar from "@/components/layouts/FocusAwareStatusBar";
import IconButton from "@/components/layouts/IconButton";
import theme from "@/config/theme";
import { useSession } from "@/ctx";
import { Redirect, Stack, useRouter } from "expo-router";
import { Text } from "react-native";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const router = useRouter();

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

  const RootView = Platform.OS === "ios" ? View : SafeAreaView;

  // This layout can be deferred because it's not the root layout.
  return (
    <RootView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <FocusAwareStatusBar
        backgroundColor={theme().color.primary.main}
        style="light"
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
    </RootView>
  );
}
