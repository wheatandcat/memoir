import View from "@/components/elements/View";
import React from "react";
import TextInput from "./";

export default {
  title: "atoms",
};

export const _TextInput = () => (
  <View p={3}>
    <TextInput placeholder="タイトル" />
  </View>
);

_TextInput.story = {
  name: "TextInput",
};
