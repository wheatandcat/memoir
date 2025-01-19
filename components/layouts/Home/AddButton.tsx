import View from "@/components/elements/View";
import theme from "@/config/theme";
import { MaterialIcons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  onPress: () => void;
};

const AddButton: FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View px={3} py={3}>
        <View style={styles.addButton}>
          <MaterialIcons name="add" size={56} color={theme().color.base.dark} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(AddButton);

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: theme().color.base.main,
    width: "100%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
});
