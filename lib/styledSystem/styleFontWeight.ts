import theme from "@/config/theme";
import type { TextStyle } from "react-native";

export type FontWeight = keyof ReturnType<typeof theme>["fontWeights"];

type Props = {
  fontWeight?: FontWeight;
};

export const styleFontWeight = (props: Props): TextStyle => {
  if (!props.fontWeight) return {};

  return {
    fontWeight: theme().fontWeights[props.fontWeight],
  };
};
