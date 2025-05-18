import { testRenderer } from "@/lib/testUtil";
import { user } from "@/mocks/__mockData__/user";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import React from "react";

import IndexPage from "../";

describe("components/pages/Search/index.tsx", () => {
  it("正常にrenderすること", async () => {
    testRenderer(<IndexPage />)();

    await waitForElementToBeRemoved(() => screen.getByTestId("atoms_loading"));

    await waitFor(async () => {
      expect(screen.findByText("検索")).toBeTruthy();
    });
  });
});
