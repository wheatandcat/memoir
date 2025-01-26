import View from "@/components/elements/View";
import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import AddItemModal from "./";

export default {
  title: "organisms",
};

export const _AddItemModal = () => (
  <View>
    <AddItemModal
      isVisible
      loading={false}
      date="2020-01-01"
      onClose={mockFn("onClose")}
      onAdd={mockFn("onCategory")}
    />
  </View>
);

_AddItemModal.story = {
  name: "AddItemModal",
  parameters: { loki: { skip: true } },
};
