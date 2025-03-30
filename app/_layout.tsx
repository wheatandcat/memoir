import { SessionProvider } from "@/ctx";
import makeApolloClient from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Notification from "containers/Notification";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { RecoilRoot } from "recoil";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
});

export default function Root() {
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
}
