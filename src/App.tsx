import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import makeApolloClient from 'lib/apollo';
import useIsFirstRender from 'hooks/useIsFirstRender';
import WithProvider from './WithProvider';

type CacheShape = any;

function App() {
  const isFirstRender = useIsFirstRender();
  const [client, setClient] = useState<ApolloClient<CacheShape> | null>(null);

  const fetchSession = async () => {
    const apolloClient = await makeApolloClient();
    setClient(apolloClient);
  };

  useEffect(() => {
    if (!isFirstRender) return;

    fetchSession();
  }, [isFirstRender]);

  if (!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <WithProvider />
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
