import { user } from "__mockData__/user";
import React from "react";
import Page, { type Props } from "./Page";

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
