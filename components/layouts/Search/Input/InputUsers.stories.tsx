import View from "@/components/elements/View";
import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import { StyleSheet } from "react-native";
import InputUsers from "./InputUsers";
import type { Props as InputUsersProps } from "./InputUsers";

const inputUsers = (): InputUsersProps => ({
  users: [
    {
      id: "test1",
      image: "https://placehold.jp/150x150.png",
    },
    {
      id: "test2",
      image: "https://placehold.jp/150x150.png",
    },
    {
      id: "test3",
      image: "https://placehold.jp/150x150.png",
    },
    {
      id: "test4",
      image: "https://placehold.jp/150x150.png",
    },
    {
      id: "test5",
      image: "https://placehold.jp/150x150.png",
    },
  ],
  userIDList: [],
  onAdd: mockFn("onAdd"),
  onRemove: mockFn("onRemove"),
});

export default {
  title: "organisms/Search/Input/InputUsers",
};

export const _1人 = () => (
  <View style={styles.center}>
    <InputUsers {...inputUsers()} users={inputUsers().users.slice(0, 1)} />
  </View>
);

export const _2人 = () => (
  <View style={styles.center}>
    <InputUsers {...inputUsers()} users={inputUsers().users.slice(0, 2)} />
  </View>
);

export const _3人 = () => (
  <View style={styles.center}>
    <InputUsers {...inputUsers()} users={inputUsers().users.slice(0, 3)} />
  </View>
);

export const _4人 = () => (
  <View style={styles.center}>
    <InputUsers {...inputUsers()} users={inputUsers().users.slice(0, 4)} />
  </View>
);

export const _5人 = () => (
  <View style={styles.center}>
    <InputUsers {...inputUsers()} />
  </View>
);

const styles = StyleSheet.create({
  center: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
