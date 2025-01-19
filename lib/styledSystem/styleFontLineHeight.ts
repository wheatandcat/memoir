import type { TextStyle } from "react-native";

type Props = {
  lineHeight?: number;
};

export const styleFontLineHeight = (props: Props): TextStyle => {
  if (!props.lineHeight) return {};

  return {
    lineHeight: props.lineHeight,
  };
};
