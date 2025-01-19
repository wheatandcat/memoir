import { useIsFocused } from "@react-navigation/native";
import { StatusBar, type StatusBarProps } from "expo-status-bar";
import type { FC } from "react";

const FocusAwareStatusBar: FC<StatusBarProps> = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
