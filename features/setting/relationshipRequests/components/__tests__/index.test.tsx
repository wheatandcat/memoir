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
      params: {},
    },
  }) as any;

describe("components/pages/Setting/RelationshipRequests/index.tsx", () => {
  it("正常にrenderすること", async () => {
    testRenderer(<IndexPage {...propsData()} />)();

    await waitForElementToBeRemoved(() => screen.getByTestId("atoms_loading"));

    await waitFor(async () => {
      expect(screen.findAllByText("削除")).toBeTruthy();
    });
  });
});
