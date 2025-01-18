import { screen, waitFor } from "@testing-library/react-native";
import { items } from "__mockData__/item";
import { testRenderer } from "lib/testUtil";
import React from "react";
import ScreenShot, { type Props } from "../ScreenShot";

const propsData = (): Props => ({
  items: items().map((v) => ({ ...v, userID: "test" })),
  startDate: "2020-01-01",
  endDate: "2020-01-07",
  users: [
    {
      id: "test",
      displayName: "suzuki",
      image: "https://placehold.jp/150x150.png",
    },
  ],
});

describe("components/organisms/Memoir/ScreenShot.tsx", () => {
  it("正常にrenderすること", async () => {
    testRenderer(<ScreenShot {...propsData()} />)();
    await waitFor(async () => {
      expect(screen.findByText("買い物")).toBeTruthy();
    });
  });
});
