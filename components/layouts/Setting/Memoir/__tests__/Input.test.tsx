import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import Input, { type Props } from "../Input";

const propsData = (): Props => ({
  dayOfWeek: 0,
  time: new Date("0000-01-01T00:00:00"),
  onChangeDayOfWeek: jest.fn(),
  onChangeTime: jest.fn(),
});

describe("components/organisms/Setting/Memoir/Input.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Input {...propsData()} />)();
    expect(screen.findAllByText("曜日の")).toBeTruthy();
  });
});
