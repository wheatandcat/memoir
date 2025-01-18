import { screen } from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import InputInvite, { type Props } from "../InputInvite";

const propsData = (): Props => ({
  onOpen: jest.fn(),
});

describe("components/organisms/AddShareUser/InputInvite.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<InputInvite {...propsData()} />)();
    expect(
      screen.findAllByText(
        "共有メンバーに追加したいユーザーの招待コードを入力してください",
      ),
    ).toBeTruthy();
  });
});
