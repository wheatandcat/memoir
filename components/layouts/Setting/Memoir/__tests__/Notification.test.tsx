import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import Notification, { type Props } from "../Notification";

const propsData = (): Props => ({
  push: 0,
  setPush: jest.fn(),
});

describe("components/organisms/Setting/Memoir/Notification.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Notification {...propsData()} />)();
    expect(screen.findAllByText("プッシュ通知")).toBeTruthy();
  });
});
