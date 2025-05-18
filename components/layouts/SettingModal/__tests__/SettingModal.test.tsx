import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";

import SettingModal from "../";
import type { Props } from "../";

const propsData = (): Props => ({
  isVisible: true,
  onClose: jest.fn(),
});

describe("components/organisms//SettingModal.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<SettingModal {...propsData()} />)();
    expect(screen.findAllByText("データ管理")).toBeTruthy();
  });
});
