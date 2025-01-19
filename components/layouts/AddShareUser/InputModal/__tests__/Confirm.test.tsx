import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import Confirm, { type Props } from "../Confirm";

const propsData = (): Props => ({
  displayName: "test",
  image: "",
  onNG: jest.fn(),
  onOK: jest.fn(),
  requesting: false,
});

describe("components/organisms/AddShareUser/InputModal/Confirm.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Confirm {...propsData()} />)();
    expect(screen.findAllByText("キャンセル")).toBeTruthy();
  });
});
