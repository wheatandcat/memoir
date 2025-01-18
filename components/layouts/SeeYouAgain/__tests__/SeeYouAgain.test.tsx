import { screen } from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import SeeYouAgain from "../SeeYouAgain";

describe("components/templates/SeeYouAgain/SeeYouAgain.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<SeeYouAgain />)();
    expect(screen.findAllByText("TOPに戻る")).toBeTruthy();
  });
});
