import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import type { ApolloError } from "@apollo/client";
import type { FC } from "react";
import { StyleSheet } from "react-native";

type Props = {
  error?: ApolloError;
};

const tError: FC<Props> = (props) => {
  return (
    <View>
      <Text style={styles.text}>エラーが発生しました</Text>
      <Text>{props.error?.message ?? ""}</Text>
    </View>
  );
};

export default tError;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    height: "100%",
    width: "100%",
    backgroundColor: theme().color.background.light,
  },
});
