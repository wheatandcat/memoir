import { testRenderer } from "@/lib/testUtil";
import { screen } from "@testing-library/react-native";
import { invite } from "__mockData__/Invite";
import { user } from "__mockData__/user";
import React from "react";
import InviteCard from "../InviteCard";
import type { Props } from "../InviteCard";

const propsData = (): Props => ({
  loading: false,
  creating: false,
  updating: false,
  invite: invite(),
  user: {
    ...user(),
    userID: "",
  },
  onCreateInvite: jest.fn(),
  onUpdateInvite: jest.fn(),
});

describe("components/organisms/AddShareUser/InviteCard.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<InviteCard {...propsData()} />)();
    expect(screen.findAllByText("招待コードをコピー")).toBeTruthy();
  });
});
