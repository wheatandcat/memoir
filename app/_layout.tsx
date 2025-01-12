import { Slot } from 'expo-router';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import makeApolloClient from 'lib/apollo';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SessionProvider } from '@/ctx';

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
