import { SessionProvider } from "@/ctx";
import makeApolloClient from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { RecoilRoot } from "recoil";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 500);

export default function Root() {
  const client = makeApolloClient();

  return (
    <ActionSheetProvider>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <SessionProvider>
            <Slot />
          </SessionProvider>
        </RecoilRoot>
      </ApolloProvider>
    </ActionSheetProvider>
  );
}
