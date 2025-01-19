import useSentryBreadcrumb from "@/hooks/useSentryBreadcrumb";
import { userState } from "@/store/atoms";
import { useLocalSearchParams } from "expo-router";
import type React from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import Page from "./Page";

const SettingAcceptedRelationship: React.FC = (props) => {
  useSentryBreadcrumb();
  const user = useRecoilValue(userState);
  const { displayName, image } = useLocalSearchParams<{
    displayName: string;
    image: string;
  }>();

  return <Page user={user} displayName={displayName} image={image} />;
};

export default memo(SettingAcceptedRelationship);
