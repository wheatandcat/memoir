import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import Image from "../";
import type { Props } from "../";

const propsData = (): Props => ({
  source: require("@/assets/img/categories/category_book.png"),
  width: 100,
  height: 100,
  testID: "test-id-image",
});

describe("@/components/elements/Image/Image.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Image {...propsData()} />)();
    expect(screen.findByTestId("test-id-image")).toBeTruthy();
  });
});
