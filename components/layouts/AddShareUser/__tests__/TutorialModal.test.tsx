import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import TutorialModal from "../TutorialModal";
import type { Props } from "../TutorialModal";

const propsData = (): Props => ({
  isVisible: true,
  onClose: jest.fn(),
  onPress: jest.fn(),
});

describe("components/organisms/AddShareUser/TutorialModal.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<TutorialModal {...propsData()} />)();
    expect(screen.findAllByText("招待コードを作成する")).toBeTruthy();
  });
});
