import View from "@/components/elements/View";
import theme from "@/config/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { FC } from "react";
import { memo } from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

type Name =
  | "more-vert"
  | "more-horiz"
  | "close"
  | "favorite"
  | "favorite-border"
  | "highlight-off"
  | "refresh";

type Props = {
  name: Name;
  size?: "sm" | "base" | "lg";
  testID?: string;
  color?: string;
  outline?: boolean;
  onPress: () => void;
};

const IconButton: FC<Props> = ({ size = "base", ...props }) => {
  const iconSize = theme().icon.size[size];

  const button: ViewStyle[] = [];

  if (props.outline) {
    button.push(styles.button);
  }

  return (
    <TouchableOpacity onPress={props.onPress} testID={props.testID}>
      <View style={button}>
        <MaterialIcons
          name={props.name}
          size={iconSize}
          color={props.color || theme().color.secondary.main}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.base.dark,
    borderRadius: 25,
    padding: theme().space(0),
  },
});

export default memo(IconButton);
