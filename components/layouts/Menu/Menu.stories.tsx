import React from "react";
import { mockFn } from "storyBookUtils/index";
import Menu from "./Menu";

export default {
  title: "organisms/Menu",
};

export const _Menu = () => (
  <Menu
    items={[
      {
        text: "削除",
        color: "error",
        onPress: mockFn("item1"),
        removeMenu: true,
      },
      {
        text: "編集",
        color: "secondary",
        onPress: mockFn("item2"),
        removeMenu: true,
      },
    ]}
  />
);
