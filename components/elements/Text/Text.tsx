import type { FontColor } from "@/lib/styledSystem/styleFontColor";
import { styleFontColor } from "@/lib/styledSystem/styleFontColor";
import { styleFontLineHeight } from "@/lib/styledSystem/styleFontLineHeight";
import { styleFontSize } from "@/lib/styledSystem/styleFontSize";
import type { FontSize } from "@/lib/styledSystem/styleFontSize";
import type { FontVariants } from "@/lib/styledSystem/styleFontVariant";
import { styleFontVariant } from "@/lib/styledSystem/styleFontVariant";
import { styleFontWeight } from "@/lib/styledSystem/styleFontWeight";
import type { FontWeight } from "@/lib/styledSystem/styleFontWeight";
import type { FC } from "react";
import { Platform, Text as RNText } from "react-native";
import type { TextProps, TextStyle } from "react-native";

export type FontFamily = "RobotoCondensed-Bold" | "NotoSansJP-Bold";

type Props = TextProps & {
  variants?: FontVariants;
  size?: FontSize;
  fontWeight?: FontWeight;
  color?: FontColor;
  textAlign?: TextStyle["textAlign"];
  underline?: boolean;
  lineHeight?: number;
  fontFamily?: FontFamily;
};

const Text: FC<Props> = ({
  variants = "body",
  fontFamily = "RobotoCondensed-Bold",
  ...props
}) => {
  const style = {
    ...styleFontVariant({ variants }),
    ...styleFontSize(props),
    ...styleFontWeight(props),
    ...styleFontColor(props),
    ...styleFontLineHeight(props),
  } as TextStyle;

  return (
    <RNText {...props} style={enhanceStyle(style, { ...props, fontFamily })} />
  );
};

const enhanceStyle = (style: TextStyle, props: Props) => {
  if (props.textAlign) style.textAlign = props.textAlign;
  if (props.underline) style.textDecorationLine = "underline";

  const r = {
    ...style,
    fontFamily: props.fontFamily,
  };

  if (Platform.OS === "android") {
    r.fontWeight = undefined;
  }

  return r;
};

export default Text;
