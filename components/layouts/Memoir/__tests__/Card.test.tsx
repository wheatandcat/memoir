import { screen } from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Card, { type Props } from "../Card";

const propsData = (): Props => ({
  title: "title",
  categoryID: 1,
  user: {
    id: "test",
    displayName: "suzuki",
    image: "",
  },
});

describe("components/organisms/Memoir/Card.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Card {...propsData()} />)();
    expect(screen.findAllByText("suzuki")).toBeTruthy();
  });
});
