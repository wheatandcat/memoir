import { screen } from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Input, { type Props } from "../Input";

const propsData = (): Props => ({
  code: "",
  onChange: jest.fn(),
});

describe("components/organisms/AddShareUser/InputModal/Input.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Input {...propsData()} />)();
    expect(screen.findAllByText("D")).toBeTruthy();
  });
});
