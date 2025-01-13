import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "config/theme";
import dayjs from "lib/dayjs";
import type React from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";

export type Props = {
  startDate: string;
  endDate: string;
  isTitle?: boolean;
};

const Header: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      {!!props.isTitle && (
        <View>
          <Text variants="logo" textAlign="center">
            memoir
          </Text>
        </View>
      )}
      <View style={styles.date}>
        <Text variants="middle" textAlign="center" color="baseLight">
          {dayjs(props.startDate).format("YYYY.MM.DD")} -{" "}
          {dayjs(props.endDate).format("YYYY.MM.DD")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    width: "100%",
  },
  date: {
    justifyContent: "center",
    backgroundColor: theme().color.secondary.main,
    marginHorizontal: theme().space(3),
    marginVertical: theme().space(3),
    paddingVertical: theme().space(0),
  },
});

export default memo(Header);
