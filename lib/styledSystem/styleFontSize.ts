import theme from "@/config/theme";
import type { TextStyle } from "react-native";

export type FontSize = keyof ReturnType<typeof theme>["fontSizes"];

type Props = {
  size?: FontSize;
};

export const styleFontSize = (props: Props): TextStyle => {
  if (!props.size) return {};

  return {
    fontSize: theme().fontSizes[props.size],
  };
};
