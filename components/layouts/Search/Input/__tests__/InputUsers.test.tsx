import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import { users } from "__mockData__/user";
import React from "react";
import InputUsers from "../InputUsers";
import type { Props } from "../InputUsers";

const propsData = (): Props => ({
  users: users(),
  userIDList: [],
  onAdd: jest.fn(),
  onRemove: jest.fn(),
});

describe("components/organisms/Search/Input/InputUsers.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<InputUsers {...propsData()} />)();
    expect(screen.findByTestId("input-users")).toBeTruthy();
  });
});
