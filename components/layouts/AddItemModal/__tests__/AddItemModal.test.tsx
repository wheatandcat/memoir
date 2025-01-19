import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import { item } from "__mockData__/item";
import React from "react";
import AddItemModal, { type Props } from "../";

const propsData = (): Props => ({
  item: {
    categoryID: item().categoryID,
    date: item().date,
    dislike: item().dislike,
    like: item().like,
    title: item().title,
  },
  isVisible: true,
  loading: false,
  date: "2020-01-01",
  onAdd: jest.fn(),
  onClose: jest.fn(),
});

describe("components/organisms/AddItemModal/AddItemModal.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<AddItemModal {...propsData()} />)();
    expect(screen.findAllByText("入力")).toBeTruthy();
  });
});
