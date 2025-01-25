import { relationships } from "__mockData__/relationship";
import { user } from "__mockData__/user";
import React from "react";
import { mockFn } from "storyBookUtils/index";
import Page from "./Page";
import type { Props } from "./Page";

const props = (): Props => ({
  onLogin: mockFn("onLogin"),
  onLogout: mockFn("onLogout"),
  onUpdateProfile: mockFn("onUpdateProfile"),
  onAddShareUser: mockFn("onAddShareUser"),
  onRelationshipRequests: mockFn("onRelationshipRequests"),
  user: {
    ...user(),
    userID: "",
  },
  relationshipRequestCount: 3,
  relationships: relationships(),
  deleting: false,
  onDeleteRelationship: mockFn("onDeleteRelationship"),
});

export default {
  title: "templates/MyPage",
};

export const ログイン前 = () => <Page {...props()} />;
export const ログイン後 = () => <Page {...props()} authenticated />;
