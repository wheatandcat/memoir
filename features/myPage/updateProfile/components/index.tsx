import useSentryBreadcrumb from "@/hooks/useSentryBreadcrumb";
import type React from "react";
import { memo } from "react";
import Connected from "./Connected";

const UpdateProfile: React.FC = () => {
  useSentryBreadcrumb();

  return <Connected />;
};

export default memo(UpdateProfile);
