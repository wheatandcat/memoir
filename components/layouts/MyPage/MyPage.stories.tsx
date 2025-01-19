import { relationships } from "__mockData__/relationship";
import { user } from "__mockData__/user";
import React from "react";
import { mockFn } from "storyBookUtils/index";
import Authenticated, {
  type Props as AuthenticatedProps,
} from "./Authenticated";
import NotAuthenticated, {
  type Props as NotAuthenticatedProps,
} from "./NotAuthenticated";

const props1 = (): NotAuthenticatedProps => ({
  user: {
    ...user(),
    userID: "",
  },
  onLogin: mockFn("onLogin"),
  onUpdateProfile: mockFn("onLogin"),
});

const props2 = (): AuthenticatedProps => ({
  user: {
    ...user(),
    userID: "",
  },
  relationshipRequestCount: 3,
  relationships: relationships(),
  onLogout: mockFn("onLogout"),
  onUpdateProfile: mockFn("onUpdateProfile"),
  onAddShareUser: mockFn("onAddShareUser"),
  onRelationshipRequests: mockFn("onRelationshipRequests"),
  deleting: false,
  onDeleteRelationship: mockFn("onDeleteRelationship"),
});

export default {
  title: "organisms/MyPage",
};

export const _NotAuthenticated = () => <NotAuthenticated {...props1()} />;

_NotAuthenticated.story = {
  name: "NotAuthenticated",
};

export const _Authenticated = () => <Authenticated {...props2()} />;
