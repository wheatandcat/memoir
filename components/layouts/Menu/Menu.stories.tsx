import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import Menu from "./Menu";

export default {
  title: "components/layouts/Menu",
};

export const _Menu = () => (
  <Menu
    items={[
      {
        text: "削除",
        color: "error",
        onPress: mockFn("item1"),
      },
      {
        text: "編集",
        color: "secondary",
        onPress: mockFn("item2"),
      },
    ]}
  />
);
