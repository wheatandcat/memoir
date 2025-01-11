import { Slot } from 'expo-router';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { RecoilRoot } from 'recoil';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import makeApolloClient from 'lib/apollo';
import AppLoading from 'components/templates/App/Loading';
import { SessionProvider } from '../ctx';

type CacheShape = any;

export default function Root() {
  const [client, setClient] = useState<ApolloClient<CacheShape> | null>(null);

  const fetchSession = async () => {
    const apolloClient = await makeApolloClient();
    setClient(apolloClient);
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    fetchSession();
  });

  if (!client) {
    return <AppLoading />;
  }

  // Set up the auth context and render our layout inside of it.
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}
