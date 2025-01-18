import { screen } from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Categories, { type Props } from "../";

const propsData = (): Props => ({
  categoryID: 1,
  onPress: jest.fn(),
});

describe("components/organisms/Categories/Categories.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Categories {...propsData()} />)();
    expect(screen.findAllByText("特別なこと")).toBeTruthy();
  });
});
