import { screen } from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Sent, { type Props } from "../Sent";

const propsData = (): Props => ({
  displayName: "test",
});

describe("components/organisms/AddShareUser/InputModal/Sent.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Sent {...propsData()} />)();
    expect(screen.findAllByText("test")).toBeTruthy();
  });
});
