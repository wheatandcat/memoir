import { screen } from "@testing-library/react-native";
import { items } from "__mockData__/item";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Cards, { type Props } from "../Cards";

const propsData = (): Props => ({
  date: "2020-01-01",
  addItemLoading: false,
  loading: false,
  items: items(),
  onItem: jest.fn(),
  onAddItem: jest.fn(),
});

describe("components/organisms/Cards/Cards.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Cards {...propsData()} />)();
    expect(screen.findAllByText("ジムに行った")).toBeTruthy();
  });
});
