import useSentryBreadcrumb from "@/hooks/useSentryBreadcrumb";
import type React from "react";
import { memo } from "react";
import Connected from "./Connected";

const SettingAddShareUser: React.FC = () => {
  useSentryBreadcrumb();

  return <Connected />;
};

export default memo(SettingAddShareUser);
