import IconButton from "@/components/layouts/IconButton";
import theme from "@/config/theme";
import { useSession } from "@/ctx";
import { Redirect, Stack, useRouter } from "expo-router";
import { Text } from "react-native";

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

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          title: "memoir",
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: theme().color.base.main,
          },
          headerLeft: () => (
            <IconButton
              name="highlight-off"
              size="base"
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
}
