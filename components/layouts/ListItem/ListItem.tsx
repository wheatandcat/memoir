import Text from "@/components/elements/Text";
import type { FontFamily } from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import { MaterialIcons } from "@expo/vector-icons";
import type { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import type { ViewStyle } from "react-native";

type Props = {
  title: string;
  divider?: boolean;
  fontFamily?: FontFamily;
  onPress: () => void;
};

const ListItem: FC<Props> = ({
  divider = false,
  fontFamily = "RobotoCondensed-Bold",
  ...props
}) => {
  const style: ViewStyle = {};

  if (divider) {
    style.borderBottomWidth = StyleSheet.hairlineWidth;
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.root, style]}>
        <View>
          <Text fontFamily={fontFamily}>{props.title}</Text>
        </View>
        <View>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color={theme().color.secondary.main}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.base.main,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme().space(3),
  },
});

export default ListItem;
