import View from "@/components/elements/View";
import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import SettingModal from "./";

export default {
  title: "components/layouts",
};

export const _SettingModal = () => (
  <View>
    <SettingModal isVisible onClose={mockFn("onClose")} />
  </View>
);

_SettingModal.story = {
  name: "SettingModal",
  parameters: { loki: { skip: true } },
};
