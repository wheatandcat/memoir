import React, { useState, useEffect, useCallback } from 'react';
import { RecoilRoot } from 'recoil';
import { AppState } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { RootSiblingParent } from 'react-native-root-siblings';
import makeApolloClient from 'lib/apollo';
import useIsFirstRender from 'hooks/useIsFirstRender';
import Notification from 'containers/Notification';
import Config from 'containers/Config';
import { getFireStore } from 'lib/firebase';
import { getAppConfig, defaultAppConfig, AppConfig } from 'lib/appConfig';
import Maintenance from 'components/templates/Maintenance/Page';
import ForceUpdate from 'components/templates/ForceUpdate/Page';
import Constants from 'expo-constants';
import compareVersions from 'compare-versions';
import WithProvider from './WithProvider';

type CacheShape = any;

const db = getFireStore();

function App() {
  const isFirstRender = useIsFirstRender();
  const [client, setClient] = useState<ApolloClient<CacheShape> | null>(null);
  const [appConfig, setAppConfig] = useState<AppConfig>(defaultAppConfig());

  const getMaintenance = useCallback(async () => {
    //フォアグラウンドになったときのみこの関数を実行
    const config = await getAppConfig(db);
    setAppConfig(config);
  }, []);

  const handleUpdate = useCallback(
    async (state: string) => {
      if (state === 'active') {
        //フォアグラウンドになったときのみこの関数を実行
        getMaintenance();
      }
    },
    [getMaintenance]
  );

  const fetchSession = async () => {
    const config = await getAppConfig(db);
    setAppConfig(config);

    const apolloClient = await makeApolloClient();
    setClient(apolloClient);
  };

  useEffect(() => {
    if (!isFirstRender) return;

    fetchSession();
  }, [isFirstRender]);

  useEffect(() => {
    AppState.addEventListener('change', handleUpdate);
    return () => {
      AppState.removeEventListener('change', handleUpdate);
    };
  }, [handleUpdate]);

  if (!client) {
    return null;
  }

  if (appConfig.maintenance) {
    return <Maintenance {...appConfig} getMaintenance={getMaintenance} />;
  }

  if (
    compareVersions.compare(
      appConfig.supportVersion,
      Constants?.manifest?.version || '1.0.0',
      '>'
    )
  ) {
    return <ForceUpdate />;
  }

  return (
    <ActionSheetProvider>
      <ApolloProvider client={client}>
        <Config>
          <Notification>
            <RecoilRoot>
              <RootSiblingParent>
                <WithProvider />
              </RootSiblingParent>
            </RecoilRoot>
          </Notification>
        </Config>
      </ApolloProvider>
    </ActionSheetProvider>
  );
}

export default App;
