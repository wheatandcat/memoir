import { screen } from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Button, { type Props } from "../";

const propsData = (): Props => ({
  size: "sm",
  width: 100,
  title: "title",
  loading: false,
  disabled: false,
  onPress: jest.fn(),
});

describe("@/components/elements/Button/Button.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Button {...propsData()} />)();
    expect(screen.findAllByText("title")).toBeTruthy();
  });
});
