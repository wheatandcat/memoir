import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import InputModal from "./InputModal";
import type { Props as InputModalProps } from "./InputModal";

const inputModalProps = (): InputModalProps => ({
  isVisible: true,
  displayName: "",
  requesting: false,
  onClose: mockFn("onClose"),
  onSearchInviteCode: mockFn("onSearchInviteCode"),
  onCreateRelationshipRequest: mockFn("onCreateRelationshipRequest"),
});

export default {
  title: "components/layouts/AddShareUser/InputModal",
};

export const 入力画面 = () => <InputModal {...inputModalProps()} />;

入力画面.story = {
  parameters: {
    loki: { skip: true },
  },
};

export const 確認 = () => (
  <InputModal
    {...inputModalProps()}
    isConfirm={true}
    confirmUser={{ displayName: "suzuki", image: "" }}
  />
);

確認.story = {
  parameters: { loki: { skip: true } },
};

export const 送信後 = () => (
  <InputModal {...inputModalProps()} displayName="suzuki" />
);

送信後.story = {
  parameters: { loki: { skip: true } },
};
