import { testRenderer } from "@/lib/testUtil";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";
import Menu from "../Menu";
import type { Props } from "../Menu";

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
  it("正常にrenderすること", async () => {
    testRenderer(<Menu {...propsData()} />)();

    expect(screen.findByTestId("menu")).toBeTruthy();
  });
});
