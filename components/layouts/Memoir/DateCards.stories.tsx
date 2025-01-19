import View from "@/components/elements/View";
import theme from "@/config/theme";
import { items } from "__mockData__/item";
import React from "react";
import { StyleSheet } from "react-native";
import { mockFn } from "storyBookUtils/index";
import DateCards, { type Props } from "./DateCards";

const props = (): Props => ({
  items: items().map((v) => ({ ...v, userID: "test" })),
  pageInfo: {
    hasNextPage: false,
    endCursor: "",
  },
  onLoadMore: mockFn("onLoadMore"),
  loading: false,
  startDate: "2020-01-01",
  endDate: "2020-01-07",
  users: [
    {
      id: "test",
      displayName: "suzuki",
      image: "https://placehold.jp/150x150.png",
    },
  ],
  selectedUserIDList: ["test"],
  onChangeUserID: mockFn("onChangeUserID"),
  search: false,
});

export default {
  title: "organisms/Memoir/DateCards",
};

export const Default = () => (
  <View style={styles.root}>
    <DateCards {...props()} />
  </View>
);

Default.story = {
  name: "default",
};

export const Loading = () => (
  <View style={styles.root}>
    <DateCards {...props()} loading />
  </View>
);

Loading.story = {
  name: "loading",
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: theme().color.background.main,
  },
});
