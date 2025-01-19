import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import Page from "../Page";

describe("components/templates/ForceUpdate/Page.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Page />)();
    expect(screen.findAllByText("ストアへ")).toBeTruthy();
  });
});
