import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import { user } from "__mockData__/user";
import React from "react";
import Page from "../Page";
import type { Props } from "../Page";

const propsData = (): Props => ({
  user: {
    ...user(),
    userID: "",
  },
  displayName: "suzuki",
  image: "",
});

describe("components/templates/Setting/AcceptedRelationship/Page.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText("一覧に戻る")).toBeTruthy();
  });
});
