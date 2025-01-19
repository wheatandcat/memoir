import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import Loading, { type Props } from "../Loading";

const propsData = (): Props => ({ text: "テスト" });

describe("@/components/layouts/Overlay/Loading.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Loading {...propsData()} />)();
    expect(screen.findByTestId("overlay-loading")).toBeTruthy();
  });
});
