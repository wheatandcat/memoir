import { Slot } from 'expo-router';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import makeApolloClient from 'lib/apollo';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SessionProvider } from '@/ctx';
import * as SplashScreen from 'expo-splash-screen';

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
