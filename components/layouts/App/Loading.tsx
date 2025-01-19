import ALoading from "@/components/elements/Loading";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import { memo } from "react";
import type { FC } from "react";
import { StyleSheet } from "react-native";

const Loading: FC = () => {
  return (
    <View style={styles.root}>
      <ALoading />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default memo(Loading);
