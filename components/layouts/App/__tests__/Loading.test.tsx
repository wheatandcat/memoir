import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import Loading from "../Loading";

describe("components/templates/App/Loading.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Loading />)();
    expect(screen.findByTestId("atoms_loading")).toBeTruthy();
  });
});
