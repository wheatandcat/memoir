import { screen } from "@testing-library/react-native";
import { item } from "__mockData__/item";
import { user } from "__mockData__/user";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Card, { type Props } from "../";

const propsData = (): Props => ({
  title: item().title,
  categoryID: item().categoryID,
  user: {
    id: user().id,
    name: "name",
  },
  onPress: jest.fn(),
});

describe("components/organisms/Card/Card.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Card {...propsData()} />)();
    expect(screen.findAllByText("買い物")).toBeTruthy();
  });
});
