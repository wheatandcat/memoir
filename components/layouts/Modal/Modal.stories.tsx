import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import Modal from "./";

export default {
  title: "components/layouts",
};

export const _Modal = () => (
  <View>
    <Modal
      title="タイトル"
      isVisible={true}
      onClose={mockFn("onClose")}
      loading={false}
    >
      <View pt={5}>
        <Text textAlign="center" variants="large">
          props.children
        </Text>
      </View>
    </Modal>
  </View>
);

_Modal.story = {
  parameters: { loki: { skip: true } },
};
