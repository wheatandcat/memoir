import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import InputDialog from "../InputModal";
import type { Props } from "../InputModal";

const propsData = (): Props => ({
  isVisible: true,
  displayName: "",
  requesting: false,
  onClose: jest.fn(),
  onSearchInviteCode: jest.fn(),
  isConfirm: false,
  confirmUser: null,
  onCreateRelationshipRequest: jest.fn(),
});

describe("components/organisms/AddShareUser/InputModal.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<InputDialog {...propsData()} />)();
    expect(screen.findAllByText("送信")).toBeTruthy();
  });
});
