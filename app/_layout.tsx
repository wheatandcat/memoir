import { SessionProvider } from "@/ctx";
import makeApolloClient from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import * as Sentry from "@sentry/react-native";
import Notification from "containers/Notification";
import { isRunningInExpoGo } from "expo";
import Constants from "expo-constants";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { RecoilRoot } from "recoil";

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

Sentry.init({
  dsn: Constants.expoConfig?.extra?.SENTRY_DSN,
  debug: Constants.expoConfig?.extra?.APP_ENV !== "production",
  tracesSampleRate: 1.0,
  integrations: [navigationIntegration],
  enableNativeFramesTracking: !isRunningInExpoGo(),
});

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
});

export default Sentry.wrap(function Root() {
  const client = makeApolloClient();

  return (
    <ActionSheetProvider>
      <ApolloProvider client={client}>
        <Notification>
          <RecoilRoot>
            <SessionProvider>
              <Slot />
            </SessionProvider>
          </RecoilRoot>
        </Notification>
      </ApolloProvider>
    </ActionSheetProvider>
  );
});
