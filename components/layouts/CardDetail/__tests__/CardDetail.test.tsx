import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import { item } from "__mockData__/item";
import React from "react";
import CardDetail from "../CardDetail";
import type { Props } from "../CardDetail";

const propsData = (): Props => ({
  title: item().title,
  date: item().date,
  categoryID: item().categoryID,
  like: item().like,
  dislike: item().dislike,
  onOpenUpdateItem: jest.fn(),
  onDeleteItem: jest.fn(),
});

describe("components/organisms/CardDetail/CardDetail.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<CardDetail {...propsData()} />)();
    expect(screen.findAllByText("買い物")).toBeTruthy();
  });
});
