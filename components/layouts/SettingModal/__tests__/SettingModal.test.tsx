import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import * as Recoil from "recoil";
import SettingModal, { type Props } from "../";

const propsData = (): Props => ({
  isVisible: true,
  onClose: jest.fn(),
});

describe("components/organisms//SettingModal.tsx", () => {
  beforeEach(() => {
    jest.spyOn(Recoil, "useRecoilValue").mockImplementation((): any => ({
      uid: "abc",
    }));
  });

  it("正常にrenderすること", () => {
    testRenderer(<SettingModal {...propsData()} />)();
    expect(screen.findAllByText("データ管理")).toBeTruthy();
  });
});
