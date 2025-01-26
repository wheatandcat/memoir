import { testRenderer } from "@/lib/testUtil";
import { relationships } from "@/mocks/__mockData__/relationship";
import { screen } from "@testing-library/react-native";
import React from "react";
import List, { type Props } from "../List";

const propsData = (): Props => ({
  onAdd: jest.fn(),
  deleting: false,
  onDeleteRelationship: jest.fn(),
  relationships: relationships(),
});

describe("components/organisms/ShareUser/List.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<List {...propsData()} />)();
    expect(screen.findByTestId("share-user-list")).toBeTruthy();
  });
});
