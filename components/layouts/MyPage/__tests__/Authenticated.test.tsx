import { testRenderer } from "@/lib/testUtil";
import { relationships } from "@/mocks/__mockData__/relationship";
import { user } from "@/mocks/__mockData__/user";
import { screen } from "@testing-library/react-native";
import React from "react";
import Authenticated from "../Authenticated";
import type { Props } from "../Authenticated";

const propsData = (): Props => ({
  user: {
    ...user(),
    userID: "",
  },
  relationships: relationships(),
  relationshipRequestCount: 3,
  onUpdateProfile: jest.fn(),
  onLogout: jest.fn(),
  onAddShareUser: jest.fn(),
  onRelationshipRequests: jest.fn(),
  deleting: false,
  onDeleteRelationship: jest.fn(),
});

describe("components/organisms/MyPage/Authenticated.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Authenticated {...propsData()} />)();
    expect(screen.findAllByText("共有メンバー")).toBeTruthy();
  });
});
