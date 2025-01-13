import Category from "@/components/elements/Category";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "config/theme";
import dayjs from "lib/dayjs";
import type React from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";

type Props = {
  date: string;
  categoryID: number;
};

const DateText: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View my={3}>
        <Category categoryID={props.categoryID} />
      </View>
      <View style={styles.date}>
        <Text textAlign="center" variants="logo">
          {dayjs(props.date).format("YYYY.MM.DD / ddd")}
        </Text>
      </View>
    </View>
  );
};

export default memo(DateText);

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: theme().space(2),
  },
  date: {
    height: 70,
  },
});
