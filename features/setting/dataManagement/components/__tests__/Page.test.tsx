import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import Page, { type Props } from "../Page";

const propsData = (): Props => ({
  loading: false,
  disabledDeleteButton: false,
  onDelete: jest.fn(),
});

describe("components/templates/DataManagement/Page.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText("アカウント削除")).toBeTruthy();
  });
});
