import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import { relationshipRequests } from "__mockData__/relationshipRequest";
import React from "react";
import { mockFn } from "storyBookUtils/index";
import List from "../List";
import type { Props } from "../List";

const propsData = (): Props => ({
  items: relationshipRequests(),
  pageInfo: {
    hasNextPage: false,
    endCursor: "",
  },
  onLoadMore: mockFn("onLoadMore"),
  loading: false,
  onOK: jest.fn(),
  onNG: jest.fn(),
  ngRequesting: false,
  acceptRequesting: false,
});

describe("components/organisms/RelationshipRequest/List.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<List {...propsData()} />)();
    expect(screen.findAllByText("削除")).toBeTruthy();
  });
});
