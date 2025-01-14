import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import * as Recoil from "recoil";
import IndexPage from "../";

describe("components/pages/Setting/AddShareUser/index.tsx", () => {
  beforeEach(() => {
    jest.spyOn(Recoil, "useRecoilValue").mockImplementation((): any => ({
      id: "test-id",
      displayName: "test-name",
    }));
  });

  it("正常にrenderすること", async () => {
    testRenderer(<IndexPage />)();

    await waitForElementToBeRemoved(() => screen.getByTestId("atoms_loading"));

    await waitFor(async () => {
      expect(screen.findAllByText("招待コードを入力")).toBeTruthy();
    });
  });
});
