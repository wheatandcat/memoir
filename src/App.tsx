import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { RootSiblingParent } from 'react-native-root-siblings';
import makeApolloClient from 'lib/apollo';
import useIsFirstRender from 'hooks/useIsFirstRender';
import Notification from 'containers/Notification';
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
    <ActionSheetProvider>
      <ApolloProvider client={client}>
        <Notification>
          <RecoilRoot>
            <RootSiblingParent>
              <WithProvider />
            </RootSiblingParent>
          </RecoilRoot>
        </Notification>
      </ApolloProvider>
    </ActionSheetProvider>
  );
}

export default App;
