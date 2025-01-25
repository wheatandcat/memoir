import type { SpaceProps } from "@/lib/styledSystem/styleSpace";
import { styleSpace } from "@/lib/styledSystem/styleSpace";
import type { FC } from "react";
import { View as RNView } from "react-native";
import type { ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & SpaceProps;

const View: FC<Props> = (props) => {
  const style = {
    ...styleSpace(props),
  } as ViewStyle;

  return <RNView {...props} style={[style, props.style]} />;
};

export default View;
