import useSentryBreadcrumb from "hooks/useSentryBreadcrumb";
import type React from "react";
import { memo } from "react";
import Page from "./Page";

const SettingLicence: React.FC = () => {
  useSentryBreadcrumb();

  return <Page />;
};

export default memo(SettingLicence);
