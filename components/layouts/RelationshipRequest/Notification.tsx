import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "config/theme";
import { type FC, memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export type Props = {
  count: number;
  onPress: () => void;
};

const Notification: FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.root}>
        <View>
          <Image
            source={require("@/src/img/icon/icon_edit.png")}
            width={35}
            height={35}
            contentFit="contain"
          />
        </View>
        <View>
          <Text size="sm">招待申請が{props.count}件届いています</Text>
        </View>
        <View>
          <MaterialIcons name="chevron-right" size={30} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.primary.light,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: theme().space(2),
  },
});

export default memo(Notification);
