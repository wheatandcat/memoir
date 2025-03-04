import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import Page from "./Page";
import type { Props } from "./Page";

const props = (): Props => ({
  authenticated: true,
  user: {
    id: "test-id",
    userID: "",
    displayName: "test-name",
    image: "",
  },
  loading: false,
  onSave: mockFn("onSave"),
});

export default {
  title: "templates/UpdateProfile",
};

export const _Page = () => <Page {...props()} />;
