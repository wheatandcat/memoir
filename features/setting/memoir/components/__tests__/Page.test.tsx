import * as useMemoirNotificationSetting from "@/hooks/useMemoirNotificationSetting";
import { testRenderer } from "@/lib/testUtil";
import { memoirNotificationSetting } from "@/mocks/__mockData__/memoirNotificationSetting";
import { screen } from "@testing-library/react-native";
import React from "react";
import Page from "../Page";
import type { Props } from "../Page";

const propsData = (): Props => ({
  dayOfWeek: 0,
  hours: 0,
  minutes: 0,
  notification: false,
  onSave: jest.fn(),
});

describe("components/pages/Setting/Memoir/index.tsx", () => {
  beforeEach(() => {
    jest
      .spyOn(useMemoirNotificationSetting, "default")
      .mockImplementation((): any => ({
        ...memoirNotificationSetting(),
        loading: false,
        onSave: jest.fn(),
      }));
  });

  it("正常にrenderすること", () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText("保存")).toBeTruthy();
  });
});
