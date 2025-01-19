import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import React from "react";
import InputDate, { type Props } from "../InputDate";

const propsData = (): Props => ({
  startDate: new Date("2021-01-01T00:00:00+09:00"),
  endDate: new Date("2021-01-18T00:00:00+09:00"),
  onChangeStartDate: jest.fn(),
  onChangeEndDate: jest.fn(),
});

describe("components/organisms/Search/Input/InputDate.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<InputDate {...propsData()} />)();
    expect(screen.findAllByText("2021.01.01")).toBeTruthy();
  });
});
