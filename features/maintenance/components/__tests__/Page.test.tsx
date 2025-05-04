import { testRenderer } from "@/lib/testUtil";
import { appConfig } from "@/mocks/__mockData__/appConfig";
import { screen } from "@testing-library/react-native";
import React from "react";
import Page, { type Props } from "../Page";

const propsData = (): Props => ({
  ...appConfig({
    maintenance: true,
    maintenanceMessage:
      "システムメンテナンス終了まで、もうしばらくお待ち下さい。",
    maintenancePeriod: "2021年1月1日 10:00〜12:00",
  }),
  getMaintenance: jest.fn(),
});

describe("components/templates/Maintenance/Page.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText("2021年1月1日 10:00〜12:00")).toBeTruthy();
  });
});
