import useSentryBreadcrumb from "@/hooks/useSentryBreadcrumb";
import { useUserStore } from "@/store/userStore";
import { useLocalSearchParams } from "expo-router";
import type React from "react";
import { memo } from "react";
import Page from "./Page";

const SettingAcceptedRelationship: React.FC = (props) => {
  useSentryBreadcrumb();
  const user = useUserStore((state) => state.user);
  const { displayName, image } = useLocalSearchParams<{
    displayName: string;
    image: string;
  }>();

  return <Page user={user} displayName={displayName} image={image} />;
};

export default memo(SettingAcceptedRelationship);
