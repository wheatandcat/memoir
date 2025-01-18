import { screen } from "@testing-library/react-native";
import { relationshipRequest } from "__mockData__/relationshipRequest";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Card, { type Props } from "../Card";

const propsData = (): Props => ({
  ...relationshipRequest(),
  onOK: jest.fn(),
  onNG: jest.fn(),
  ngRequesting: false,
  acceptRequesting: false,
});

describe("components/organisms/RelationshipRequest/Card.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Card {...propsData()} />)();
    expect(screen.findAllByText("共有メンバー申請が届いています")).toBeTruthy();
  });
});
