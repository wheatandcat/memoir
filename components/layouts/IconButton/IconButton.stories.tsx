import View from "@/components/elements/View";
import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import IconButton from "./";

export default {
  title: "components/layouts",
};

export const _IconButton = () => (
  <View>
    <View p={2}>
      <IconButton name="more-vert" size="sm" onPress={mockFn("onPress")} />
    </View>
    <View p={2}>
      <IconButton name="more-vert" size="base" onPress={mockFn("onPress")} />
    </View>
    <View p={2}>
      <IconButton name="more-vert" size="lg" onPress={mockFn("onPress")} />
    </View>
  </View>
);

_IconButton.story = {
  name: "IconButton",
};
