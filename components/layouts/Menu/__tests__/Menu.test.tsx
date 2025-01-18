import { screen } from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Menu, { type Props } from "../Menu";

const propsData = (): Props => ({
  items: [
    {
      text: "text",
      color: "primary",
      onPress: jest.fn(),
      removeMenu: false,
    },
  ],
});

describe("components/organisms/Menu/Menu.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Menu {...propsData()} />)();
    expect(screen.findByTestId("menu_modal")).toBeTruthy();
  });
});
