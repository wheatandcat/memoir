import useIsFirstRender from '@/hooks/useIsFirstRender';
import usePrevious from '@/hooks/usePrevious';
import { type ApolloClient, ApolloProvider } from '@apollo/client';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { compare } from 'compare-versions';
import AppLoading from 'components/templates/App/Loading';
import ForceUpdate from 'components/templates/ForceUpdate/Page';
import Maintenance from 'components/templates/Maintenance/Page';
import Notification from 'containers/Notification';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as SplashScreen from 'expo-splash-screen';
import makeApolloClient from 'lib/apollo';
import { type AppConfig, defaultAppConfig, getAppConfig } from 'lib/appConfig';
import { getFirestoreApp } from 'lib/firebase';
import React, { useState, useEffect, useCallback } from 'react';
import { AppState } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import * as Sentry from 'sentry-expo';
import WithProvider from './WithProvider';

Sentry.init({
  dsn: Constants.expoConfig?.extra?.SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: Device.isDevice,
});

type CacheShape = any;

const db = getFirestoreApp();

function App() {
  const isFirstRender = useIsFirstRender();
  const [client, setClient] = useState<ApolloClient<CacheShape> | null>(null);
  const [appConfig, setAppConfig] = useState<AppConfig>(defaultAppConfig());

  const forceUpdate = compare(
    appConfig.supportVersion,
    Constants?.manifest?.version || '1.0.0',
    '>'
  );
  const prevForceUpdate = usePrevious(forceUpdate);

  const checkAppConfig = useCallback(async () => {
    //フォアグラウンドになったときのみこの関数を実行
    const config = await getAppConfig(db);
    if (!config.maintenance && appConfig.maintenance) {
      // メンテナンスから非メンテナンスになった
      client?.cache.reset();
    }

    setAppConfig(config);

    return config;
  }, [appConfig, client]);

  const handleUpdate = useCallback(
    async (state: string) => {
      if (state === 'active') {
        checkAppConfig();
      }
    },
    [checkAppConfig]
  );

  const fetchSession = async () => {
    const config = await getAppConfig(db);
    setAppConfig(config);

    const apolloClient = await makeApolloClient();
    setClient(apolloClient);
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    if (!isFirstRender) return;

    fetchSession();
  }, [isFirstRender]);

  useEffect(() => {
    if (forceUpdate && !prevForceUpdate) {
      client?.cache.reset();
    }
  }, [forceUpdate, prevForceUpdate, client]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleUpdate);
    return () => {
      subscription.remove();
    };
  }, [handleUpdate]);

  if (!client) {
    return <AppLoading />;
  }

  if (appConfig.maintenance) {
    return <Maintenance {...appConfig} getMaintenance={checkAppConfig} />;
  }

  if (forceUpdate) {
    return <ForceUpdate />;
  }

  return (
    <ActionSheetProvider>
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Notification>
            <RecoilRoot>
              <RootSiblingParent>
                <WithProvider />
              </RootSiblingParent>
            </RecoilRoot>
          </Notification>
        </ApolloProvider>
      </SafeAreaProvider>
    </ActionSheetProvider>
  );
}

export default App;
