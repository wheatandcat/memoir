import View from "@/components/elements/View";
import theme from "@/config/theme";
import { items } from "__mockData__/item";
import React from "react";
import { StyleSheet } from "react-native";
import ScreenShot, { type Props as ScreenShotProps } from "./ScreenShot";

const screenShotProps = (): ScreenShotProps => ({
  items: items().map((v) => ({ ...v, userID: "test" })),
  startDate: "2020-01-01",
  endDate: "2020-01-07",
  users: [
    {
      id: "test",
      displayName: "suzuki",
      image: "https://placehold.jp/150x150.png",
    },
  ],
});

export default {
  title: "organisms/Memoir/ScreenShot",
};

export const _Default = () => (
  <View style={styles.root}>
    <ScreenShot {...screenShotProps()} />
  </View>
);

_Default.story = {
  name: "default",
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: theme().color.background.main,
  },
});
