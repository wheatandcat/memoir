import FocusAwareStatusBar from "@/components/layouts/FocusAwareStatusBar";
import theme from "@/config/theme";
import MaintenanceContainer from "@/containers/Maintenance";
import Notification from "@/containers/Notification";
import { SessionProvider } from "@/ctx";
import makeApolloClient from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from "expo";
import Constants from "expo-constants";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

/*
import { removeItem, storageKey } from "@/lib/storage";
removeItem(storageKey.AUTH_UID_KEY);
removeItem(storageKey.AUTH_ID_TOKEN_KEY);
removeItem(storageKey.AUTH_ID_TOKEN_EXPIRATION_KEY);
*/

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

if (Constants.expoConfig?.extra?.APP_ENV === "production") {
  Sentry.init({
    dsn: Constants.expoConfig?.extra?.SENTRY_DSN,
    debug: Constants.expoConfig?.extra?.APP_ENV !== "production",
    tracesSampleRate: 1.0,
    integrations: [navigationIntegration],
    enableNativeFramesTracking: !isRunningInExpoGo(),
  });
}

SplashScreen.preventAutoHideAsync().catch(() => {
  console.log("SplashScreen.preventAutoHideAsync() error");
});
SplashScreen.setOptions({
  duration: 1000,
});

export default Sentry.wrap(function Root() {
  const client = makeApolloClient();

  return (
    <SessionProvider>
      <FocusAwareStatusBar
        backgroundColor={theme().color.primary.main}
        style="dark"
      />
      <ActionSheetProvider>
        <ApolloProvider client={client}>
          <Notification>
            <MaintenanceContainer>
              <Slot />
            </MaintenanceContainer>
          </Notification>
        </ApolloProvider>
      </ActionSheetProvider>
    </SessionProvider>
  );
});
