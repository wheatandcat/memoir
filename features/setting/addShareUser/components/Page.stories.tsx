import { invite } from "__mockData__/Invite";
import { user } from "__mockData__/user";
import React from "react";
import { mockFn } from "storyBookUtils/index";
import Page from "./Page";
import type { Props } from "./Page";

const props = (): Props => ({
  invite: invite(),
  user: {
    ...user(),
    userID: "",
  },
  loading: false,
  creating: false,
  updating: false,
  requesting: false,
  requestUser: null,
  onCreateInvite: mockFn("onCreateInvite"),
  onUpdateInvite: mockFn("onUpdateInvite"),
  onSearchInviteCode: mockFn("onSearchInviteCode"),
  onCreateRelationshipRequest: mockFn("onCreateRelationshipRequest"),
  confirmUser: null,
});

export default {
  title: "templates/Setting/AddShareUser",
};

export const _Page = () => <Page {...props()} />;
