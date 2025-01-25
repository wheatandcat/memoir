import { testRenderer } from "@/lib/testUtil";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import React from "react";
import IndexPage from "../";

describe("components/pages/Setting/RelationshipRequests/index.tsx", () => {
  it("正常にrenderすること", async () => {
    testRenderer(<IndexPage />)();

    await waitForElementToBeRemoved(() => screen.getByTestId("atoms_loading"));

    await waitFor(async () => {
      expect(screen.findAllByText("削除")).toBeTruthy();
    });
  });
});
