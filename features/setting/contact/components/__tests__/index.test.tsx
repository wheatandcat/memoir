import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import Page from "../Page";
import type { Props } from "../Page";

const propsData = (): Props => ({
  userID: "test",
  loading: false,
  send: false,
  text: "",
  onContact: jest.fn(),
  onChangeText: jest.fn(),
  onClose: jest.fn(),
});

describe("components/pages/Contact/Page.tsx", () => {
  it("正常にrenderすること", async () => {
    testRenderer(<Page {...propsData()} />)();

    expect(screen.findAllByText("コメント")).toBeTruthy();
  });
});
