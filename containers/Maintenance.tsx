import ForceUpdate from "@/features/forceUpdate/components/Page";
import Maintenance from "@/features/maintenance/components/Page";
import {
  type AppConfig,
  defaultAppConfig,
  getAppConfig,
} from "@/lib/appConfig";
import { getFirestoreApp } from "@/lib/firebase";
import { compare } from "compare-versions";
import Constants from "expo-constants";
import useIsFirstRender from "hooks/useIsFirstRender";
import usePrevious from "hooks/usePrevious";
import type React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";

type Props = {
  children: React.ReactNode;
};

const db = getFirestoreApp();

const MaintenanceContainer: React.FC<Props> = memo((props) => {
  const isFirstRender = useIsFirstRender();
  const [appConfig, setAppConfig] = useState<AppConfig>(defaultAppConfig());

  const forceUpdate = compare(
    appConfig.supportVersion,
    Constants?.expoConfig?.version || "1.0.0",
    ">",
  );

  const checkAppConfig = useCallback(async () => {
    //フォアグラウンドになったときのみこの関数を実行
    const config = await getAppConfig(db);

    setAppConfig(config);

    return config;
  }, []);

  const fetchSession = useCallback(async () => {
    const config = await getAppConfig(db);
    setAppConfig(config);
  }, []);

  useEffect(() => {
    if (!isFirstRender) return;

    fetchSession();
  }, [isFirstRender, fetchSession]);

  const handleUpdate = useCallback(
    async (state: string) => {
      if (state === "active") {
        checkAppConfig();
      }
    },
    [checkAppConfig],
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleUpdate);
    return () => {
      subscription.remove();
    };
  }, [handleUpdate]);

  if (forceUpdate) {
    return <ForceUpdate />;
  }

  if (appConfig.maintenance) {
    return <Maintenance {...appConfig} getMaintenance={checkAppConfig} />;
  }
  return props.children;
});

export default MaintenanceContainer;
