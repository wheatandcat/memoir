import { appConfig } from "@/mocks/__mockData__/appConfig";
import React from "react";
import Page, { type Props } from "./Page";

const props = (): Props => ({
  ...appConfig({
    maintenance: true,
    maintenanceMessage:
      "システムメンテナンス終了まで、もうしばらくお待ち下さい。",
    maintenancePeriod: "2021年1月1日 10:00〜12:00",
  }),
  getMaintenance: () => null,
});

export default {
  title: "features/Maintenance",
};

export const _Page = () => <Page {...props()} />;
