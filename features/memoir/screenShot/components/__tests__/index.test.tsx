import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import IndexPage, { type Props } from "../";

const propsData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        startDate: "2020-01-01",
        endDate: "2020-01-07",
      },
    },
  }) as any;

describe("components/pages/Memoir/ScreenShot/index.tsx", () => {
  it("正常にrenderすること", async () => {
    testRenderer(<IndexPage {...propsData()} />)();

    await waitForElementToBeRemoved(() => screen.getByTestId("atoms_loading"));

    await waitFor(async () => {
      expect(screen.findAllByText("未設定")).toBeTruthy();
    });
  });
});
