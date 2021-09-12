import React, { useState, useEffect, useCallback } from 'react';
import { RecoilRoot } from 'recoil';
import { AppState } from 'react-native';
import * as Sentry from 'sentry-expo';
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
import useUpdateExpo from 'hooks/useUpdateExpo';
import Constants from 'expo-constants';
import compareVersions from 'compare-versions';
import WithProvider from './WithProvider';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: Constants.isDevice,
});

type CacheShape = any;

const db = getFireStore();

function App() {
  const isFirstRender = useIsFirstRender();
  const [client, setClient] = useState<ApolloClient<CacheShape> | null>(null);
  const [appConfig, setAppConfig] = useState<AppConfig>(defaultAppConfig());
  const { onUpdateApp } = useUpdateExpo();

  const forceUpdate = compareVersions.compare(
    appConfig.supportVersion,
    Constants?.manifest?.version || '1.0.0',
    '>'
  );

  const checkAppConfig = useCallback(async () => {
    //フォアグラウンドになったときのみこの関数を実行
    const config = await getAppConfig(db);
    setAppConfig(config);

    return config;
  }, []);

  const handleUpdate = useCallback(
    async (state: string) => {
      if (state === 'active') {
        const config = await checkAppConfig();
        if (
          !config.maintenance &&
          !compareVersions.compare(
            config.supportVersion,
            Constants?.manifest?.version || '1.0.0',
            '>'
          )
        ) {
          //メンテンナンス or 強制アップデートが有効でない場合にOTAをチェック
          onUpdateApp();
        }
      }
    },
    [checkAppConfig, onUpdateApp]
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
    return <Maintenance {...appConfig} getMaintenance={checkAppConfig} />;
  }

  if (forceUpdate) {
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
