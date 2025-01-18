import { screen } from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Loading, { type Props } from "../Loading";

const propsData = (): Props => ({});

describe("components/templates/App/Loading.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Loading {...propsData()} />)();
    expect(screen.findByTestId("atoms_loading")).toBeTruthy();
  });
});
