import theme from "config/theme";
import useSentryBreadcrumb from "hooks/useSentryBreadcrumb";
import type React from "react";
import Connected from "./Connected";

const MyPage: React.FC = () => {
  useSentryBreadcrumb();

  return <Connected />;
};

export const MyPageScreenOption = (title: string) => {
  return {
    title,
    headerStyle: {
      backgroundColor: theme().color.primary.main,
    },
    headerBackTitleVisible: false,
    headerTintColor: theme().color.secondary.main,
  };
};

export default MyPage;
