import theme from "@/config/theme";
import { type SpaceProps, styleSpace } from "@/lib/styledSystem/styleSpace";
import type { FC } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

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
