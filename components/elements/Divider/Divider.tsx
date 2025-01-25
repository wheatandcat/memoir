import theme from "@/config/theme";
import { styleSpace } from "@/lib/styledSystem/styleSpace";
import type { SpaceProps } from "@/lib/styledSystem/styleSpace";
import type { FC } from "react";
import { StyleSheet, View } from "react-native";
import type { ViewStyle } from "react-native";

type Props = {} & SpaceProps;

const Divider: FC<Props> = (props) => {
  const style = {
    ...styleSpace(props),
  } as ViewStyle;

  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: theme().color.base.dark,
    height: StyleSheet.hairlineWidth,
  },
});

export default Divider;
