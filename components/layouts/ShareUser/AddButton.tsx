import View from "@/components/elements/View";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "config/theme";
import { type FC, memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export type Props = {
  onAdd: () => void;
};

const AddButton: FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onAdd} testID="add-button">
      <View style={styles.addButton}>
        <MaterialIcons name="add" size={50} color={theme().color.base.dark} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: theme().color.base.main,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(AddButton);
