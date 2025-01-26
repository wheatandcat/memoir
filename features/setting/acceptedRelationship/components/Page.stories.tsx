import { user } from "@/mocks/__mockData__/user";
import React from "react";
import Page from "./Page";
import type { Props } from "./Page";

const props = (): Props => ({
  user: {
    ...user(),
    userID: "",
  },
  displayName: "suzuki",
  image: "",
});

export default {
  title: "templates/Setting/AcceptedRelationship",
};

export const _Page = () => <Page {...props()} />;
