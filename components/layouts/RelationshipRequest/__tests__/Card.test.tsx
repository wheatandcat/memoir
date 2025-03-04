import { testRenderer } from "@/lib/testUtil";
import { relationshipRequest } from "@/mocks/__mockData__/relationshipRequest";
import { screen } from "@testing-library/react-native";
import React from "react";
import Card from "../Card";
import type { Props } from "../Card";

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
