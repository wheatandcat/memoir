import theme from "@/config/theme";
import type { TextStyle } from "react-native";

export type FontColor = keyof ReturnType<typeof theme>["fontColors"];

type Props = {
  color?: FontColor;
};

export const styleFontColor = (props: Props): TextStyle => {
  if (!props.color) return {};

  return {
    color: theme().fontColors[props.color],
  };
};
